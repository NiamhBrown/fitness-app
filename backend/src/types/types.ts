// = undefined
export type ApiResponse<T> = {
  status: number;
  message: string;
  data?: T;
};

// will i need to inc userId here once auth is implements or get from BE i think
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
