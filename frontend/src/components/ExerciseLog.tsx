import { Input } from "@/components/ui/input";
import type { WorkoutExercise } from "@/types/types";
import { CirclePlus, Trash2 } from "lucide-react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormMessage } from "./ui/form";

interface Props {
  details: WorkoutExercise;
  index: number;
}

export const ExerciseLog = ({ details, index }: Props) => {
  const { control, register } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: `exercises.${index}.sets`,
  });

  return (
    <div className="text-primary min-h-2/4 border-secondary mb-6 rounded border">
      <div className="p-2">
        <h3 className="text-lg font-semibold">{details.name}</h3>
        <p>reps: {details.recommendedReps}</p>
      </div>
      <div className="from-secondary to-hivis bg-gradient-to-b p-2">
        <div className="grid grid-cols-[2fr_4fr_4fr_1fr] items-center gap-2">
          <p></p>
          <p>reps</p>
          <p>kg</p>
          <p></p>
        </div>
        {/* hidden exerciseId input */}
        <input
          type="hidden"
          {...register(`exercises.${index}.exerciseId`)}
          value={details.exerciseId}
        />
        <div className="space-y-3">
          {fields.map((field, setIndex) => (
            <div
              key={field.id}
              className="grid grid-cols-[2fr_4fr_4fr_1fr] items-center gap-2"
            >
              <span>{setIndex + 1}</span>

              <FormField
                control={control}
                name={`exercises.${index}.sets.${setIndex}.reps`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="number"
                        variant="underline"
                        placeholder={details.recommendedReps}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name={`exercises.${index}.sets.${setIndex}.weight`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="number"
                        variant="underline"
                        placeholder="weight"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {setIndex === fields.length - 1 && fields.length > 1 && (
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => remove(setIndex)}
                    className="text-primary"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-center pt-4">
          <button
            type="button"
            onClick={() => append({ reps: 0, weight: 0 })}
            className="bg-secondary/50 border-secondary border-1 flex w-full justify-center rounded-md p-1"
          >
            <CirclePlus className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
