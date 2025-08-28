import { Link, useParams } from "react-router-dom";
import { dbSets } from "../assets/dummyData";
import ExerciseHistoryTable from "../components/exercise-library/ExerciseHistoryTable";

export const ExerciseDetail = () => {
  const { id } = useParams();
  console.log("id:", id);
  // filter dummy data for this exercise
  const exerciseLogs = dbSets.filter((set) => set.exerciseId === id);
  console.log("LOGS:", exerciseLogs);
  return (
    <div>
      <Link to={`/`}>
        <button>back</button>
      </Link>
      <h1>{id} History</h1>
      <ExerciseHistoryTable logs={exerciseLogs} />
    </div>
  );
};
