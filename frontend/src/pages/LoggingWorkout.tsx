import { ExerciseLog } from "@/components/ExerciseLog";
import { BackLink } from "@/components/navigation/BackLink";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useWorkoutDetail } from "@/hooks/useWorkoutDetails";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type Resolver } from "react-hook-form";
import { useParams } from "react-router-dom";
import z from "zod";

// eslint-disable-next-line react-refresh/only-export-components
export const workoutLogSchema = z.object({
  exercises: z.array(
    z.object({
      reps: z.coerce.number().min(1, "Reps required"),
      weight: z.coerce.number().min(0, "Weight required"),
    }),
  ),
});

export const LoggingWorkout = () => {
  const { id } = useParams<{ id: string }>();
  //wouldnt really wanna call this again, but for now
  const { data, isLoading, isError } = useWorkoutDetail(id);
  console.log("data, isLoading, isError", data, isLoading, isError);

  const form = useForm<z.infer<typeof workoutLogSchema>>({
    resolver: zodResolver(workoutLogSchema) as Resolver<
      z.infer<typeof workoutLogSchema>
    >, // this fixed the coerce errors
    defaultValues: {},
  });

  const onSubmit = (data: z.infer<typeof workoutLogSchema>) => {
    console.log("⭐️FORM HAS BEEN SUBMITTED:", data);
  };

  return (
    <>
      <div className="flex min-h-screen flex-col gap-6 p-6 sm:max-w-2xl">
        <BackLink to={`/workout/${id}`} />
        <h1 className="text-primary font-heading text-4xl sm:text-6xl md:text-7xl">
          {data?.name}
        </h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {data?.exercises.map((ex: any, index: number) => (
              <ExerciseLog key={ex.id} details={ex} index={index} />
            ))}
            <Button type="submit" className="mt-8 w-full">
              Submit workout
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};
