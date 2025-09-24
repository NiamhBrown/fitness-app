import type { Session, User } from "@supabase/supabase-js";
import type { ReactNode } from "react";

export type Exercise = {
  id: string;
  name: string;
  description?: string;
  muscleGroup?: string;
  createdAt?: string; // or date?
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
export type NewExerciseLogInput = {
  reps: number;
  weight: number;
  date?: string; // optional, defaults to today
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
    password: string
  ) => Promise<{ user: User | null; error: string | null }>;
  signUp: (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) => Promise<{ user: User | null; error: string | null }>;
  signOut: () => Promise<{ error: string | null }>;
  isAuthenticated: boolean;
};
