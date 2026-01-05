import { ExerciseLog } from "@/components/ExerciseLog";
import { BackLink } from "@/components/navigation/BackLink";
import { Timer } from "@/components/Timer";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useAddWorkout } from "@/hooks/use-addWorkout";
import { useWorkoutDetail } from "@/hooks/useWorkoutDetails";
import type { WorkoutExercise } from "@/types/types";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm, type Resolver } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import z from "zod";

// eslint-disable-next-line react-refresh/only-export-components
export const workoutLogSchema = z.object({
  exercises: z.array(
    z.object({
      exerciseId: z.string(),
      sets: z.array(
        z.object({
          reps: z.coerce.number().min(1, "reps required"),
          weight: z.coerce.number().min(1, "weight required"),
        }),
      ),
    }),
  ),
});

export const LoggingWorkout = () => {
  const [seconds, setSeconds] = useState(0);
  const { id } = useParams<{ id: string }>();
  const { data } = useWorkoutDetail(id);
  const { mutateAsync, isPending, isError } = useAddWorkout();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof workoutLogSchema>>({
    resolver: zodResolver(workoutLogSchema) as Resolver<
      z.infer<typeof workoutLogSchema>
    >, // this fixed the coerce errors
    defaultValues: {},
  });

  // When data loads, reset form with populated default values
  useEffect(() => {
    if (data) {
      form.reset({
        exercises: data.exercises.map((ex: WorkoutExercise) => ({
          exerciseId: ex.exerciseId,
          sets: Array.from({ length: ex.recommendedSets || 3 }).map(() => ({
            reps: 0,
            weight: 0,
          })),
        })),
      });
    }
  }, [data, form]);

  const onSubmit = async (data: z.infer<typeof workoutLogSchema>) => {
    if (id) {
      const payload = { ...data, duration: seconds };
      await mutateAsync({ workoutId: id, newWorkout: payload });
      navigate("/history");
    }
  };

  return (
    <>
      <div className="flex min-h-screen flex-col gap-6 p-6 sm:max-w-2xl">
        <BackLink to={`/workout/${id}`} />
        <h1 className="text-primary font-heading text-4xl sm:text-6xl md:text-7xl">
          {data?.name}
        </h1>

        <Form {...form}>
          <Timer seconds={seconds} setSeconds={setSeconds} />
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {data?.exercises.map((ex: WorkoutExercise, index: number) => (
              <ExerciseLog key={ex.id} details={ex} index={index} />
            ))}
            {isError && (
              <p className="text-red-500">
                Something went wrong. Please try again.
              </p>
            )}
            <Button type="submit" className="mt-8 w-full" disabled={isPending}>
              Submit workout
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};
