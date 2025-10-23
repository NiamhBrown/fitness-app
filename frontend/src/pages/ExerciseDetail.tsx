import { AddLogDialog } from "@/components/exercise-library/AddLogDialog";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { BackLink } from "@/components/navigation/BackLink";
import { useParams } from "react-router-dom";
import ExerciseHistoryTable from "../components/exercise-library/ExerciseHistoryTable";
import { useExercise } from "../hooks/use-exercise";
import { useExerciseLogs } from "../hooks/use-exerciseLogs";
import { usePersonalBest } from "@/hooks/use-pb";
import { PersonalBest } from "@/components/PersonalBest";

export const ExerciseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: exercise } = useExercise(id);
  const { data: exerciseLogs, isLoading, isError } = useExerciseLogs(id);
  const { data: personalBest } = usePersonalBest(id);

  // this works but doesnt update currently, need to invalidate the pb cache when new logs are added,in a simialr way the logs are invalidated in use-addLogs?????
  console.log("PERONSAL BEST RESP:", personalBest);

  return (
    <div className="flex min-h-screen flex-col gap-6 p-6 sm:max-w-2xl">
      <BackLink to="/exercises" />
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
          {personalBest && <PersonalBest data={personalBest} />}

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
