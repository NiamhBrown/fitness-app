import { ArrowBigLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";

export const WorkoutDetail = () => {
  const { id } = useParams<{ id: string }>();
  // id will be used later to fetch the details to populate this page
  console.log(id);

  return (
    <div className="flex min-h-screen flex-col gap-6 p-6 sm:max-w-2xl">
      <Link to="/workouts" className="text-primary flex items-center gap-2">
        <ArrowBigLeft />
        <span className="hover:underline">back</span>
      </Link>
      <p>COMING SOOOONNN....</p>
    </div>
  );
};
