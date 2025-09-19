import { AddLogDialog } from "@/components/exercise-library/AddLogDialog";
import { Link, useParams } from "react-router-dom";
import ExerciseHistoryTable from "../components/exercise-library/ExerciseHistoryTable";
import { useExercise } from "../hooks/use-exercise";
import { useExerciseLogs } from "../hooks/use-exerciseLogs";
import { AddLogsForm } from "@/components/exercise-library/AddLogsForm";

export const ExerciseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: exercise } = useExercise(id);
  const { data: exerciseLogs, isLoading, isError } = useExerciseLogs(id);

  if (isLoading) return <p>Loading exercise history...</p>;
  if (isError) return <p>Error loading logs.</p>;
  if (!id) return <p>Error no id</p>;

  return (
    <div>
      <Link to={`/`}>
        <button>Back</button>
      </Link>
      <h1>{exercise?.name} History</h1>
      <p>{exercise?.description}</p>
      <AddLogDialog />
      <AddLogsForm exerciseId={id} />
      {exerciseLogs?.length ? (
        <ExerciseHistoryTable logs={exerciseLogs} />
      ) : (
        <p>No logs yet</p>
      )}
    </div>
  );
};
