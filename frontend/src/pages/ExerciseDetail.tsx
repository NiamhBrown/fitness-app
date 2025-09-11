import { useParams, Link } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import type { Exercise, ExerciseLog } from "../types/types";
import ExerciseHistoryTable from "../components/exercise-library/ExerciseHistoryTable";
import { supabase } from "../supabaseClient";

export const ExerciseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();

  // Try to get exercise info from cache first
  const cachedExercises = queryClient.getQueryData<Exercise[]>(["exercises"]);
  const exerciseFromCache = cachedExercises?.find((ex) => ex.id === id);

  const { data: exercise } = useQuery<Exercise>({
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
    enabled: !exerciseFromCache, // fetch only if cache didn't have it
    initialData: exerciseFromCache, // seed initial data from cache
  });
  // Fetch logs as usual
  const {
    data: exerciseLogs,
    isLoading,
    isError,
  } = useQuery<ExerciseLog[]>({
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
        }
      );
      return res.data.data;
    },
    enabled: !!id,
  });

  if (isLoading) return <p>Loading exercise history...</p>;
  if (isError) return <p>Error loading logs.</p>;

  return (
    <div>
      <Link to={`/`}>
        <button>Back</button>
      </Link>
      <h1>{exercise?.name} History</h1>
      <p>{exercise?.description}</p>
      {exerciseLogs?.length ? (
        <ExerciseHistoryTable logs={exerciseLogs} />
      ) : (
        <p>No logs yet</p>
      )}
    </div>
  );
};
