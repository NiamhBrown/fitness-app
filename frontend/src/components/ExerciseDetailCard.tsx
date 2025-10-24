import type { WorkoutExercise } from "@/types/types";

interface Props {
  details: WorkoutExercise;
}
export const ExerciseDetailCard = ({ details }: Props) => {
  return (
    <div className="bg-secondary rounded p-4">
      <p className="mb-2">{details.name}</p>
      <div className="flex flex-row space-x-4">
        <p className="bg-primary-foreground rounded p-1">
          sets: {details.recommendedSets}
        </p>
        <p className="bg-primary-foreground rounded p-1">
          reps: {details.recommendedReps}
        </p>
        {details.restPeriodSeconds && (
          <p className="bg-primary-foreground rounded p-1">
            rest: {details.restPeriodSeconds}
          </p>
        )}
      </div>
    </div>
  );
};
