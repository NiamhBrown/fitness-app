import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { Exercise } from "../types/types";
import { supabase } from "../supabaseClient";
import axios from "axios";

export const useExercise = (id: string | undefined) => {
  const queryClient = useQueryClient();

  // Try to get exercise info from cache first
  const cachedExercises = queryClient.getQueryData<Exercise[]>(["exercises"]);
  const exerciseFromCache = cachedExercises?.find((ex) => ex.id === id);

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
    enabled: !!id && !exerciseFromCache, // fetch only if cache didn't have it and theres an id(?)
    initialData: exerciseFromCache, // seed initial data from cache
  });
};
