import { prisma } from "../prisma";

export const workoutsService = {
  getAllWorkouts: async () => {
    const workouts = await prisma.workout.findMany({
      orderBy: { createdAt: "desc" },
    });
    return workouts;
  },

  getWorkoutDetails: async (workoutId) => {
    const workout = await prisma.workout.findUnique({
      where: { id: workoutId },
      include: {
        exercises: {
          include: { Exercise: true },
          orderBy: { order: "asc" },
        },
      },
    });
    // flatten the db data for the api so its nicer to use on FE
    return {
      ...workout,
      exercises: workout.exercises.map((we) => ({
        id: we.id,
        order: we.order,
        name: we.Exercise.name,
        description: we.Exercise.description,
        muscleGroup: we.Exercise.muscleGroup,
        recommendedSets: we.recommendedSets,
        recommendedReps: we.recommendedReps,
        restPeriodSeconds: we.restPeriodSeconds,
      })),
    };
  },
};
