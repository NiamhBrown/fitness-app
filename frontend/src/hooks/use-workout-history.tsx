import { API_BASE_URL } from "@/assets/constants";
import { supabase } from "@/supabaseClient";
import type { WorkoutHistoryLog } from "@/types/types";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useWorkoutsHistory = () => {
  return useQuery<WorkoutHistoryLog[]>({
    queryKey: ["workoutsHistory"],
    queryFn: async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        throw new Error("No session found");
      }
      const res = await axios.get(`${API_BASE_URL}/workouts/history`, {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      return res.data.data;
    },
  });
};
