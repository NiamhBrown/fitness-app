import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@radix-ui/react-dialog";
import { DialogFooter, DialogHeader } from "../ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useFieldArray, useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { useAddLog } from "@/hooks/use-addLogs";
import { Trash2 } from "lucide-react";

interface Props {
  exerciseId: string;
}
const logFormSchema = z.object({
  logs: z.array(
    z.object({
      reps: z.coerce.number().min(1, "must be more than 0 reps"),
      weight: z.coerce.number().min(1, "must be more than 0 kg"),
    })
  ),
});
export const AddLogDialog = ({ exerciseId }: Props) => {
  const addLogMutation = useAddLog();
  const form = useForm<z.infer<typeof logFormSchema>>({
    resolver: zodResolver(logFormSchema) as Resolver<
      z.infer<typeof logFormSchema>
    >, // this fixed the coerce errors
    defaultValues: {
      logs: [
        { reps: 0, weight: 0 },
        { reps: 0, weight: 0 },
        { reps: 0, weight: 0 },
      ],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "logs",
  });
  const onSubmit = (data: z.infer<typeof logFormSchema>) => {
    console.log("✅", data);
    addLogMutation.mutate({
      exerciseId,
      logs: data.logs, // send the entire array at once
    });
  };

  // const formMessage = () => {
  //   if (addLogMutation.isPending) return <p>Saving log...</p>;
  //   if (addLogMutation.isError)
  //     return <p>Error saving log: {addLogMutation.error?.message}</p>;
  //   if (addLogMutation.isSuccess) return <p>Log saved!</p>;
  // }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Exercise Log</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            id="log-form"
            className="space-y-4"
          >
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="grid grid-cols-3 gap-2 items-center"
              >
                <span>Set {index + 1}</span>

                <FormField
                  control={form.control}
                  name={`logs.${index}.reps`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Reps</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`logs.${index}.weight`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Weight</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {fields.length - 1 === index && index !== 0 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => remove(index)}
                  >
                    <Trash2 />
                  </Button>
                )}
              </div>
            ))}

            <Button
              type="button"
              variant="secondary"
              onClick={() => append({ reps: 0, weight: 0 })}
            >
              Add Row
            </Button>
          </form>
        </Form>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit" form="log-form">
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
