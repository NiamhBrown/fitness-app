import { LoadingSpinner } from "@/components/LoadingSpinner";
import { useExercises } from "@/hooks/use-exercises";
import { ListItem } from "../components/ListItem";
import { useWorkouts } from "@/hooks/use-workouts";

interface Props {
  type: "exercise" | "workout";
}
export const Library = ({ type }: Props) => {
  const {
    data: exercises,
    isLoading: isExercisesLoading,
    isError: isExercisesError,
  } = useExercises();

  const {
    data: workouts,
    isLoading: isWorkoutsLoading,
    isError: isWorkoutsError,
  } = useWorkouts();

  const isLoading =
    type === "exercise" ? isExercisesLoading : isWorkoutsLoading;
  const isError = type === "exercise" ? isExercisesError : isWorkoutsError;
  const data = type === "exercise" ? exercises : workouts;

  const heading = type === "exercise" ? "Exercise Library" : "Workout Library";

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-primary font-heading text-5xl sm:text-6xl md:text-7xl">
        {heading}
      </h1>

      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <LoadingSpinner />
        </div>
      )}

      {isError && (
        <div className="flex items-center justify-center py-24">
          <h2>`sorry, unable to load ${type}s :(`</h2>
        </div>
      )}

      {data?.length === 0 && (
        <div className="flex items-center justify-center py-24">
          <h2>no exercises found</h2>
        </div>
      )}

      <div className="my-12">
        {data?.length &&
          data.map((item) => (
            <ListItem key={item.id} item={item} type={type} />
          ))}
        {isError ||
          (exercises?.length === 0 && (
            <h2>`sorry, unable to load ${type}s :(`</h2>
          ))}
      </div>
    </div>
  );
};
