import { BackLink } from "@/components/navigation/BackLink";
import { useParams } from "react-router-dom";

export const WorkoutDetail = () => {
  const { id } = useParams<{ id: string }>();
  console.log(id);

  return (
    <div className="flex min-h-screen flex-col gap-6 p-6 sm:max-w-2xl">
      <BackLink to="/workouts" />
      <p>COMING SOOOONNN....</p>
    </div>
  );
};
