import { prisma } from "../prisma";

export const workoutsService = {
  getAllWorkouts: async () => {
    const workouts = await prisma.workout.findMany({
      orderBy: { createdAt: "desc" },
    });
    return workouts;
  },
};
