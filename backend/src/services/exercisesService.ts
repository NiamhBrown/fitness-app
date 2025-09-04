import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const exercisesService = {
  getAllExercises: async () => {
    const exercises = await prisma.exercise.findMany({
      orderBy: { createdAt: "desc" },
    });
    return exercises;
  },
  getExerciseLog: async (id) => {
    const logs = await prisma.exerciseLog.findMany({
      where: { exerciseId: id },
      orderBy: { date: "asc" },
    });
    return logs;
  },
};
