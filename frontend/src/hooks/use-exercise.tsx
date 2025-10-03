import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { supabase } from "../supabaseClient";
import type { Exercise } from "../types/types";

export const useExercise = (id: string | undefined) => {
  // should u try get from cache first? but was causing issues when there were errors cause it'd cache empty data
  return useQuery<Exercise>({
    queryKey: ["exercise", id],
    queryFn: async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        throw new Error("No session found");
      }
      const res = await axios.get(`http://localhost:3000/exercises/${id}`, {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });
      return res.data.data;
    },
    enabled: !!id,
  });
};
