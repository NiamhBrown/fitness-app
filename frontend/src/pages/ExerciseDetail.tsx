import { Link, useParams } from "react-router-dom";
import ExerciseHistoryTable from "../components/exercise-library/ExerciseHistoryTable";
import { useEffect, useState } from "react";
import type { ExerciseLog } from "../types/types";

export const ExerciseDetail = () => {
  const { id } = useParams();

  const [exerciseLogs, setExerciseLogs] = useState<[ExerciseLog] | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchExerciseLogs = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/exercises/${id}/history`
        );
        const data = await res.json();
        console.log("DATAAAA😘", data);
        setExerciseLogs(data.data);
      } catch (err) {
        setError(true);
        console.error("❌ Error fetching exercises:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchExerciseLogs();
  }, [id]);
  if (isLoading) {
    return <p>Loading exercise history...</p>;
  }
  if (error) {
    return (
      <div>
        <Link to={`/`}>
          <button>back</button>
        </Link>
        <p>Something went wrong while fetching. please try again later </p>;
      </div>
    );
  }
  if (!exerciseLogs?.length) {
    return (
      <div>
        <Link to={`/`}>
          <button>back</button>
        </Link>
        <p>No results</p>
      </div>
    );
  }
  return (
    <div>
      <Link to={`/`}>
        <button>back</button>
      </Link>
      <h1>{id} History</h1>
      <ExerciseHistoryTable logs={exerciseLogs} />
    </div>
  );
};
