import { LoadingSpinner } from "@/components/LoadingSpinner";
import { useWorkoutsHistory } from "@/hooks/use-workout-history";
import { formatDateShortText, formatSeconds } from "@/util/utils";
import { ArrowBigRight } from "lucide-react";
import { Link } from "react-router-dom";

export const WorkoutHistory = () => {
  const { data, isError, isLoading } = useWorkoutsHistory();

  return (
    <>
      <div className="min-h-screen p-6">
        <h1 className="text-primary font-heading text-5xl sm:text-6xl md:text-7xl">
          Workout History
        </h1>
        {data?.length === 0 && (
          <div className="flex items-center justify-center py-24">
            <h2> you haven't logged any workouts yet </h2>
          </div>
        )}
        {isLoading && (
          <div className="flex items-center justify-center py-24">
            <LoadingSpinner />
          </div>
        )}
        {isError && (
          <div className="flex items-center justify-center py-24">
            <h2>sorry, unable to load history right now :(</h2>
          </div>
        )}
        {data?.map((log) => (
          <div
            className="text-primary bg-hivis mt-4 flex w-full max-w-md flex-col rounded-2xl p-4 sm:p-8"
            key={log.id}
          >
            <p>{formatDateShortText(log.date)}</p>
            <p className="text-2xl">{log.workout.name}</p>
            <hr />
            <p>Duration</p>
            <div className="flex justify-between">
              <p className="text-2xl">{formatSeconds(log.duration)}</p>
              <Link to={`/history/${log.id}`}>
                {" "}
                <ArrowBigRight />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
