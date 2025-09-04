import { useEffect, useState } from "react";
import { ExerciseListItem } from "../components/exercise-library/ExerciseListItem";
import type { Exercise } from "../types/types";

export const ExerciseLibrary = () => {
  const [exercises, setExercises] = useState<Exercise[] | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const res = await fetch(`http://localhost:3000/exercises`); // store as vite var?
        const data = await res.json();
        setExercises(data.data);
      } catch (err) {
        setError(true);
        console.error("❌ Error fetching exercises:", err);
        // setExercises([]); do i need this?
      } finally {
        setIsLoading(false);
      }
    };

    fetchExercises();
  }, []);

  if (isLoading) {
    return <p>Loading exercises...</p>;
  }
  if (error) {
    return <p>Something went wrong while fetching. please try again later </p>;
  }
  if (!exercises?.length) {
    return <p>No results</p>;
  }
  return (
    <div>
      <h1>Exercise Library</h1>
      {exercises.map((ex) => (
        <ExerciseListItem key={ex.id} exercise={ex} />
      ))}
    </div>
  );
};
