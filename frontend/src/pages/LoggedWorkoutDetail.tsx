import { BackLink } from "@/components/navigation/BackLink";
import { useWorkoutLog } from "@/hooks/use-workout-log";
import { formatDateShortText, formatTime12h } from "@/util/utils";
import { useParams } from "react-router-dom";

export const LoggedWorkoutDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data } = useWorkoutLog(id);
  console.log("the right data?", data?.date);

  return (
    <div className="min-h-screen p-6">
      <BackLink to="/history" />
      {data && (
        <>
          <h1 className="text-primary font-heading mt-6 text-2xl sm:text-6xl md:text-7xl">
            {data.name}
          </h1>
          <p className="text-primary mb-6">
            {formatDateShortText(data.date)} at {formatTime12h(data.date)}
          </p>

          {data.exercises.map((ex) => (
            <div className="text-primary min-h-2/4 border-secondary mb-6 max-w-lg rounded border">
              <div className="mb-3 p-2">
                <h3 className="text-lg font-semibold">{ex.name}</h3>
              </div>
              <div className="bg-secondary p-4">
                <div className="grid grid-cols-[2fr_4fr_4fr] items-center gap-2">
                  <p>set</p>
                  <p>reps</p>
                  <p>kg</p>
                </div>
                {ex.sets.map((set, index) => (
                  <>
                    <div
                      key={index}
                      className="grid grid-cols-[2fr_4fr_4fr] items-center gap-2"
                    >
                      <p>{index + 1} </p>
                      <p>{set.reps}</p>
                      <p>{set.weight}</p>
                    </div>
                  </>
                ))}
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};
