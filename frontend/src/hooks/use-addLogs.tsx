import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ExerciseLog } from "../types/types";
import { supabase } from "../supabaseClient";
import axios from "axios";

type AddLogInput = {
  exerciseId: string;
  logs: { reps: number; weight: number }[];
};

export function useAddLog(opts?: { onSuccess?: () => void }) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newLog: AddLogInput) => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) throw new Error("No session found");

      const res = await axios.post(
        `http://localhost:3000/exercises/${newLog.exerciseId}/history`,

        newLog.logs,
        {
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
        },
      );
      return res.data.data as ExerciseLog;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["exerciseLogs", variables.exerciseId],
      });
      queryClient.invalidateQueries({
        queryKey: ["personalBest", variables.exerciseId],
      });
      opts?.onSuccess?.();
    },
  });
}
