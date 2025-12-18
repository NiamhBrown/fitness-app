import { Prisma } from "@prisma/client";

export type WorkoutHistoryLog = Prisma.WorkoutLogGetPayload<{
  select: {
    id: true;
    date: true;
    duration: true;
    workout: {
      select: {
        name: true;
      };
    };
  };
}>;

export type WorkoutLogWithExercises = {
  id: string;
  date: Date;
  duration: number;
  name: string;
  exercises: {
    exerciseId: string;
    name: string;
    sets: {
      setNumber: number;
      reps: number;
      weight: number;
    }[];
  }[];
};

export type ApiResponse<T> = {
  status: number;
  message: string;
  data?: T;
};

export type NewExerciseLogInput = {
  reps: number;
  weight: number;
  date?: string; // gets set on BE anyway, defualts to now if none provided
};

export type UpdateExerciseLogInput = {
  id: string; // id of specific log to update
  reps?: number;
  weight?: number;
};

export type WorkoutLogInput = {
  // workoutId: string; getting it from params
  duration;
  exercises: {
    exerciseId: string;
    sets: {
      reps: number;
      weight: number;
    }[];
  }[];
};
