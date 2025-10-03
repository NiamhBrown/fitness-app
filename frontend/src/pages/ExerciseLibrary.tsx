import { LoadingSpinner } from "@/components/LoadingSpinner";
import { useExercises } from "@/hooks/use-exercises";
import { ExerciseListItem } from "../components/exercise-library/ExerciseListItem";

export const ExerciseLibrary = () => {
  const { data: exercises, isLoading, isError } = useExercises();

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-primary font-heading text-5xl sm:text-6xl md:text-7xl">
        Exercise Library
      </h1>

      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <LoadingSpinner />
        </div>
      )}

      {isError && (
        <div className="flex items-center justify-center py-24">
          <h2>sorry, unable to load exercises :(</h2>
        </div>
      )}

      {exercises?.length === 0 && (
        <div className="flex items-center justify-center py-24">
          <h2>no exercises found</h2>
        </div>
      )}

      <div className="my-12">
        {exercises?.length &&
          exercises.map((ex) => <ExerciseListItem key={ex.id} exercise={ex} />)}
        {isError ||
          (exercises?.length === 0 && (
            <h2>sorry, unable to load exercises :(</h2>
          ))}
      </div>
    </div>
  );
};
