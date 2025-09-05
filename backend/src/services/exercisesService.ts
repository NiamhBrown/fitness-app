import { ExerciseLog, PrismaClient } from "@prisma/client";
import { NewExerciseLogInput, UpdateExerciseLogInput } from "../types/types";

const prisma = new PrismaClient();
export const exercisesService = {
  getAllExercises: async () => {
    const exercises = await prisma.exercise.findMany({
      orderBy: { createdAt: "desc" },
    });
    return exercises;
  },
  getExerciseLogs: async (id) => {
    const logs = await prisma.exerciseLog.findMany({
      where: { exerciseId: id },
      orderBy: { date: "asc" },
    });
    return logs;
  },
  addExerciseLog: async (exerciseId: string, logs: NewExerciseLogInput[]) => {
    // Transform logs before inserting
    const formattedLogs = logs.map((log, index) => ({
      userId: "1", // Hardcoded until auth is ready
      exerciseId,
      date: log.date ? new Date(log.date) : new Date(),
      setNumber: index + 1, // assigned on BE not front
      reps: log.reps,
      weight: log.weight,
    }));

    const result = await prisma.exerciseLog.createMany({
      data: formattedLogs,
    });

    return result;
  },
  updateExerciseLog: async (logs: UpdateExerciseLogInput[]) => {
    const formattedLogs = logs.map((log) => {
      const data: Partial<{ reps: number; weight: number }> = {};

      if (log.reps !== undefined) data.reps = log.reps;
      if (log.weight !== undefined) data.weight = log.weight;

      // Return a prisma update promise for this log, but doesnt execute yet
      return prisma.exerciseLog.update({
        where: { id: log.id },
        data,
      });
    });

    // Execute all updates in parallel, faster than updating one by one
    const result = await Promise.all(formattedLogs);

    return result; // Returns the array of updated logs
  },
};
