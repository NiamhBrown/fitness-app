// one row per set
export type SetEntry = {
  id: string;
  exerciseId: string; // links to Exercise.id
  date: string; // ISO string
  setNumber: number;
  reps: number;
  weight: number;
};

export type Exercise = {
  id: string;
  name: string;
};

export type ExerciseHistoryTableProps = {
  logs: SetEntry[]; // array of sets filtered for a particular exercise
};
