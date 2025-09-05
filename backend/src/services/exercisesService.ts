import { ExerciseLog, PrismaClient } from "@prisma/client";

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
  addExerciseLog: async (exerciseId: string, logs: ExerciseLog[]) => {
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
};
