import type { WorkoutExercise } from "@/types/types";
interface Props {
  details: WorkoutExercise;
  index: number;
}
export const ExerciseLog = ({ details }: Props) => {
  return (
    <>
      <div className="text-primary min-h-2/4 border-secondary mb-6 rounded border">
        <div className="flex flex-col">
          <div className="felx border-hivis flex-row p-2">
            <p>{details.name}</p>
          </div>
          <div className="felx from-secondary to-hivis flex-row bg-gradient-to-b p-2">
            <p>tables gonna go hereeee </p>
          </div>
        </div>
      </div>
    </>
  );
};
