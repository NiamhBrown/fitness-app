import { ExerciseDetailCard } from "@/components/ExerciseDetailCard";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { BackLink } from "@/components/navigation/BackLink";
import { useWorkoutDetail } from "@/hooks/useWorkoutDetails";
import { useParams } from "react-router-dom";

export const WorkoutDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError } = useWorkoutDetail(id);

  return (
    <div className="flex min-h-screen flex-col gap-6 p-6 sm:max-w-2xl">
      <BackLink to="/workouts" />
      {isLoading && (
        <div className="flex items-center justify-center py-24">
          <LoadingSpinner />
        </div>
      )}
      {isError && (
        <div className="flex items-center justify-center py-24">
          <h2>sorry, unable to load this workout right now :(</h2>
        </div>
      )}
      {data && (
        <>
          <h1 className="text-primary font-heading text-4xl sm:text-6xl md:text-7xl">
            {data.name}
          </h1>

          {data?.exercises.map((ex) => (
            <ExerciseDetailCard key={ex.id} details={ex} />
          ))}
          <div className="border-accent rounded border border-solid p-4">
            <p>🤩 logging workouts coming soon !! 🤩</p>
          </div>
        </>
      )}
    </div>
  );
};
