import { useNavigate } from "react-router-dom";
import type { Exercise } from "../../types/types";
import { Button } from "../ui/button";

interface Props {
  exercise: Exercise;
}
export const ExerciseListItem = ({ exercise }: Props) => {
  const navigate = useNavigate();
  return (
    <div className="mb-6">
      <Button
        className="w-full max-w-sm text-primary rounded-2xl bg-hivis p-6 sm:p-8 hover:bg-primary hover:text-primary-foreground flex sm:items-center sm:justify-start text-2xl sm:text-4xl"
        onClick={() => navigate(`/exercise/${exercise.id}`)}
      >
        {exercise.name}
      </Button>
    </div>
  );
};
