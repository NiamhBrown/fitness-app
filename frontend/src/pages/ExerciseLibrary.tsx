import { exercises } from "../assets/dummyData";
import { ExerciseListItem } from "../components/exercise-library/ExerciseListItem";

export const ExerciseLibrary = () => {
  return (
    <div>
      <h1>Exercise Library</h1>
      {exercises.map((ex) => (
        <ExerciseListItem key={ex.id} exercise={ex} />
      ))}
    </div>
  );
};
