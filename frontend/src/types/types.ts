export type ExerciseLog = {
  id: string;
  userId: string;
  exerciseId: string;
  date: string;
  setNumber: number;
  reps: number;
  weight: number;
};
export type Exercise = {
  id: string;
  name: string;
  description?: string;
  muscleGroup?: string;
  createdAt?: string; // or date?
};

export type ExerciseHistoryTableProps = {
  logs: ExerciseLog[]; // array of sets filtered for a particular exercise
};
