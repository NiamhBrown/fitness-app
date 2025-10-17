import { useQuery } from "@tanstack/react-query";
import type { ExerciseLog } from "../types/types";
import { supabase } from "../supabaseClient";
import axios from "axios";

export const useExerciseLogs = (id: string | undefined) => {
  return useQuery<ExerciseLog[]>({
    queryKey: ["exerciseLogs", id],
    queryFn: async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        throw new Error("No session found");
      }
      const res = await axios.get(
        `http://localhost:3000/exercises/${id}/history`,
        {
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
        },
      );
      return res.data.data;
    },
    enabled: !!id,
  });
};
