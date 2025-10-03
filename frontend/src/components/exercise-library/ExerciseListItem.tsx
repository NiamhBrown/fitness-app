import { Link } from "react-router-dom";
import type { Exercise } from "../../types/types";

interface Props {
  exercise: Exercise;
}
export const ExerciseListItem = ({ exercise }: Props) => {
  return (
    <div className="mb-6">
      <Link
        className="text-primary bg-hivis hover:bg-primary hover:text-primary-foreground flex w-full max-w-sm rounded-2xl p-4 text-2xl sm:items-center sm:justify-start sm:p-8 sm:text-3xl"
        to={`/exercise/${exercise.id}`}
      >
        {exercise.name}
      </Link>
    </div>
  );
};
