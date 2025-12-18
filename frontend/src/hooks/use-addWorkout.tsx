import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../supabaseClient";
import axios from "axios";
import { API_BASE_URL } from "@/assets/constants";
import type { WorkoutLogInput } from "@/types/types";

export function useAddWorkout() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      workoutId,
      newWorkout,
    }: {
      workoutId: string;
      newWorkout: WorkoutLogInput;
    }) => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      console.log("workout id:", workoutId);
      if (!session) throw new Error("No session found");
      const res = await axios.post(
        `${API_BASE_URL}/workouts/${workoutId}`,

        newWorkout,
        {
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
        },
      );
      return res.data.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["workoutsHistory", variables.workoutId],
      });
    },
  });
}
