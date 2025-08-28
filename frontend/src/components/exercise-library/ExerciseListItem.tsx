import { Link } from "react-router-dom";
import type { Exercise } from "../../types/types";

interface Props {
  exercise: Exercise;
}
export const ExerciseListItem = ({ exercise }: Props) => (
  <div>
    <Link to={`/exercise/${exercise.id}`}>
      <button>{exercise.name}</button>
    </Link>
  </div>
);
