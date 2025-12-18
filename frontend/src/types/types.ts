import type { Session, User } from "@supabase/supabase-js";
import type { ReactNode } from "react";

export type Exercise = {
  id: string;
  name: string;
  description?: string;
  muscleGroup?: string;
  createdAt?: string;
};
export type Workout = {
  id: string;
  name: string;
  description?: string;
  createdAt?: string;
  userId?: string;
};

export type WorkoutExercise = {
  id: string;
  exerciseId: string;
  order: number;
  name: string;
  description: string;
  muscleGroup: string;
  recommendedSets: number;
  recommendedReps: string;
  restPeriodSeconds: number | null;
};

export type WorkoutDetail = {
  id: string;
  name: string;
  description: string;
  userId: string;
  createdAt: string;
  exercises: WorkoutExercise[];
};

export type WorkoutLogInput = {
  exercises: {
    exerciseId: string;
    sets: {
      reps: number;
      weight: number;
    }[];
  }[];
};

export type WorkoutHistoryLog = {
  workout: { name: string };
  duration: number;
  date: string;
  workoutId: string;
  id: string;
};

export type WorkoutLog = {
  name: string;
  duration: number;
  date: string;
  workoutId: string;
  id: string;
  exercises: {
    name: string;
    exerciseId: string;
    sets: {
      reps: number;
      weight: number;
    }[];
  }[];
};

export type personalBest = {
  id: string;
  userId: string;
  exerciseId: string;
  reps: number;
  weight: number;
  date: string;
  sourceLogId?: string;
};
export type ExerciseLog = {
  id: string;
  userId: string;
  exerciseId: string;
  date: string;
  setNumber: number;
  reps: number;
  weight: number;
};

export type UpdateExerciseLogInput = {
  id: string; // id of specific log to update
  reps?: number;
  weight?: number;
};

// overkill?
export type ExerciseHistoryTableProps = {
  logs: ExerciseLog[]; // array of sets filtered for a particular exercise
};
export type AuthProviderProps = {
  children: ReactNode;
};
export type AuthContextType = {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (
    email: string,
    password: string,
  ) => Promise<{ user: User | null; error: string | null }>;
  signUp: (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
  ) => Promise<{ user: User | null; error: string | null }>;
  signOut: () => Promise<{ error: string | null }>;
  isAuthenticated: boolean;
};
