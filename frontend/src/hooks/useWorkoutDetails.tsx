import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { supabase } from "../supabaseClient";
import type { WorkoutDetail } from "@/types/types";

export const useWorkoutDetail = (id: string | undefined) => {
  return useQuery<WorkoutDetail>({
    queryKey: ["workoutDetails", id],
    queryFn: async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        throw new Error("No session found");
      }
      const res = await axios.get(`http://localhost:3000/workouts/${id}`, {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });
      return res.data.data;
    },
    enabled: !!id,
  });
};
