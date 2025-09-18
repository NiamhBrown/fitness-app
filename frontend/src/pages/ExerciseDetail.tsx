import { Link, useParams } from "react-router-dom";
import { AddLogButton } from "../components/exercise-library/AddLogButton";
import ExerciseHistoryTable from "../components/exercise-library/ExerciseHistoryTable";
import { useExercise } from "../hooks/use-exercise";
import { useExerciseLogs } from "../hooks/use-exerciseLogs";

export const ExerciseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: exercise } = useExercise(id);
  const { data: exerciseLogs, isLoading, isError } = useExerciseLogs(id);

  if (isLoading) return <p>Loading exercise history...</p>;
  if (isError) return <p>Error loading logs.</p>;

  return (
    <div>
      <Link to={`/`}>
        <button>Back</button>
      </Link>
      <h1>{exercise?.name} History</h1>
      <p>{exercise?.description}</p>
      <AddLogButton />
      {exerciseLogs?.length ? (
        <ExerciseHistoryTable logs={exerciseLogs} />
      ) : (
        <p>No logs yet</p>
      )}
    </div>
  );
};
