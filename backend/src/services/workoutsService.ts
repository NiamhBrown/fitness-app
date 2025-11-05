import { prisma } from "../prisma";
import { WorkoutLogInput } from "../types/types";

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
  addWorkoutLog: async (
    workoutId: string,
    userId: string,
    data: WorkoutLogInput,
  ) => {
    const workoutLog = await prisma.workoutLog.create({
      data: {
        workoutId,
        userId,
        date: new Date(),
        exercises: {
          create: data.exercises.flatMap((exercise) =>
            exercise.sets.map((set, index) => ({
              exerciseId: exercise.exerciseId,
              setNumber: index + 1,
              reps: set.reps,
              weight: set.weight,
            })),
          ),
        },
      },
      include: { exercises: true },
    });

    return workoutLog;
  },
};
