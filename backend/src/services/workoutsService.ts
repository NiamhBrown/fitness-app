import { prisma } from "../prisma";
import { WorkoutLogInput } from "../types/types";

function groupExercisesByExerciseId(exercises) {
  const grouped = {};

  for (const ex of exercises) {
    const exerciseId = ex.exerciseId;

    // If this exercise hasn't been seen yet, initialise it
    if (!grouped[exerciseId]) {
      grouped[exerciseId] = {
        exerciseId,
        name: ex.exercise.name,
        sets: [],
      };
    }

    // Push the set into the correct exercise
    grouped[exerciseId].sets.push({
      setNumber: ex.setNumber,
      reps: ex.reps,
      weight: ex.weight,
    });
  }
  // convert object to array so i can use .map()
  return Object.values(grouped);
}

export const workoutsService = {
  getAllWorkouts: async () => {
    const workouts = await prisma.workout.findMany({
      orderBy: { createdAt: "desc" },
    });
    return workouts;
  },

  getWorkoutHistory: async () => {
    return prisma.workoutLog.findMany({
      orderBy: { date: "desc" },
      select: {
        id: true,
        date: true,
        duration: true,
        workout: {
          select: { name: true },
        },
      },
    });
  },

  getWorkoutLogById: async (logId: string) => {
    const workoutLog = await prisma.workoutLog.findUnique({
      where: { id: logId },
      include: {
        exercises: {
          include: { exercise: true },
        },
        workout: {
          select: { name: true },
        },
      },
    });
    // group the sets by exercise for the FE
    return {
      name: workoutLog.workout.name,
      id: workoutLog.id,
      date: workoutLog.date,
      duration: workoutLog.duration,
      exercises: groupExercisesByExerciseId(workoutLog.exercises),
    };
  },

  getWorkoutDetails: async (workoutId) => {
    const workout = await prisma.workout.findUnique({
      where: { id: workoutId },
      include: {
        exercises: {
          include: { exercise: true },
          orderBy: { order: "asc" },
        },
      },
    });
    // flatten the db data for the api so its nicer to use on FE
    return {
      ...workout,
      exercises: workout.exercises.map((we) => ({
        id: we.id,
        exerciseId: we.exerciseId,
        order: we.order,
        name: we.exercise.name,
        description: we.exercise.description,
        muscleGroup: we.exercise.muscleGroup,
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
        duration: data.duration,
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
