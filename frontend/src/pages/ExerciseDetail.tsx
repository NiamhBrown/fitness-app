import { AddLogDialog } from "@/components/exercise-library/AddLogDialog";
import { ArrowBigLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import ExerciseHistoryTable from "../components/exercise-library/ExerciseHistoryTable";
import { useExercise } from "../hooks/use-exercise";
import { useExerciseLogs } from "../hooks/use-exerciseLogs";
import { LoadingSpinner } from "@/components/LoadingSpinner";

export const ExerciseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: exercise } = useExercise(id);
  const { data: exerciseLogs, isLoading, isError } = useExerciseLogs(id);

  return (
    <div className="flex min-h-screen flex-col gap-6 p-6 sm:max-w-2xl">
      <Link
        to="/exercise-library"
        className="text-primary flex items-center gap-2"
      >
        <ArrowBigLeft />
        <span className="hover:underline">back</span>
      </Link>
      {isLoading && (
        <div className="flex items-center justify-center py-24">
          <LoadingSpinner />
        </div>
      )}
      {isError && (
        <div className="flex items-center justify-center py-24">
          <h2>sorry, unable to load logs right now :(</h2>
        </div>
      )}

      {id && exercise && exerciseLogs && (
        <>
          <h1 className="text-primary font-heading text-5xl sm:text-6xl md:text-7xl">
            {exercise?.name}
          </h1>
          <div className="flex items-end justify-end">
            <AddLogDialog exerciseId={id} />
          </div>
          {exerciseLogs && exerciseLogs?.length > 0 && (
            <ExerciseHistoryTable logs={exerciseLogs} />
          )}

          {exerciseLogs?.length === 0 && (
            <div className="flex items-center justify-center py-24">
              <h2>add a log for this exercise :)</h2>
            </div>
          )}
        </>
      )}
    </div>
  );
};
