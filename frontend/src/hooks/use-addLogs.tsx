import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ExerciseLog } from "../types/types";
import { supabase } from "../supabaseClient";
import axios from "axios";
import { API_BASE_URL } from "@/assets/constants";

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
        `${API_BASE_URL}/exercises/${newLog.exerciseId}/history`,

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
