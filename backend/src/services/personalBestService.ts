import { ExerciseLog, PrismaClient } from "@prisma/client";
import { NewExerciseLogInput } from "../types/types";
const prisma = new PrismaClient();

// add types
export const personalBestService = {
  checkAndUpdatePb: async (newLogTest) => {
    const currentPb = await prisma.personalBest.findUnique({
      where: {
        userId_exerciseId: {
          userId: newLogTest.userId,
          exerciseId: newLogTest.exerciseId,
        },
      },
    });

    if (currentPb) {
      if (
        currentPb.weight > newLogTest.weight || // higher weight wins
        (currentPb.weight === newLogTest.weight &&
          currentPb.reps > newLogTest.reps) || // more reps wins if weight equal
        (currentPb.weight === newLogTest.weight &&
          currentPb.reps === newLogTest.reps &&
          currentPb.date > newLogTest.date) // date tie breaker
      ) {
        return; // do nothing, current PB is better
      }
    }

    // Upsert PB (insert if not exists, update if exists)
    const updatePbValue = await prisma.personalBest.upsert({
      where: {
        userId_exerciseId: {
          userId: newLogTest.userId,
          exerciseId: newLogTest.exerciseId,
        },
      },
      update: {
        weight: newLogTest.weight,
        reps: newLogTest.reps,
        date: newLogTest.date || new Date(),
        sourceLogId: newLogTest.id, // optional if you added sourceLogId
      },
      create: {
        userId: newLogTest.userId,
        exerciseId: newLogTest.exerciseId,
        weight: newLogTest.weight,
        reps: newLogTest.reps,
        date: newLogTest.date || new Date(),
        sourceLogId: newLogTest.id, // optional
      },
    });

    return updatePbValue;
  },
  getExercisePb: async (id, userId) => {
    const personalBest = await prisma.personalBest.findFirst({
      where: { exerciseId: id, userId: userId },
    });
    return personalBest;
  },
  getAllPbs: async (userId) => {
    const personalBests = await prisma.personalBest.findMany({
      where: { userId: userId },
    });

    return personalBests;
  },
};
