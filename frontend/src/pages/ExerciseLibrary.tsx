import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ExerciseListItem } from "../components/exercise-library/ExerciseListItem";
import type { Exercise } from "../types/types";
import { supabase } from "../supabaseClient";

export const ExerciseLibrary = () => {
  const {
    data: exercises,
    isLoading,
    isError,
  } = useQuery<Exercise[]>({
    queryKey: ["exercises"],
    queryFn: async () => {
      // 1. Get the current session
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        throw new Error("No session found");
      }

      // 2. Attach token to request
      const res = await axios.get(`http://localhost:3000/exercises`, {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      return res.data.data;
    },
  });
  console.log("DATA😛", exercises);
  if (isLoading) return <p>Loading exercises...</p>;
  if (isError) return <p>Error loading exercises.</p>;

  return (
    <div>
      <h1>Exercise Library</h1>
      {exercises?.length ? (
        exercises.map((ex) => <ExerciseListItem key={ex.id} exercise={ex} />)
      ) : (
        <p>No exercises found</p>
      )}
    </div>
  );
};
