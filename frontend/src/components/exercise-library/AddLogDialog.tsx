import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogHeader,
} from "../ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useFieldArray, useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { useAddLog } from "@/hooks/use-addLogs";
import { CirclePlus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

interface Props {
  exerciseId: string;
}
const logFormSchema = z.object({
  logs: z.array(
    z.object({
      reps: z.coerce
        .number()
        .refine((val) => !Number.isNaN(val), { message: "reps is required" })
        .min(1, "must be more than 0 reps"),
      weight: z.coerce.number().min(1, "must be more than 0 kg"),
    }),
  ),
});
export const AddLogDialog = ({ exerciseId }: Props) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const addLogMutation = useAddLog({
    onSuccess: () => setOpen(false),
  });
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
  const onSubmit = async (data: z.infer<typeof logFormSchema>) => {
    setLoading(true);
    await addLogMutation.mutateAsync({
      exerciseId,
      logs: data.logs,
    });
    setLoading(false);
  };

  useEffect(() => {
    if (open) {
      form.reset(); // fresh start every time the dialog opens, doing it on close wasnt working properly due to dialog closing animations
    }
  }, [form, open]);

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
      }}
    >
      <DialogTrigger asChild>
        <Button variant="secondary">add</Button>
      </DialogTrigger>
      <DialogContent className="from-secondary to-hivis text-primary min-h-2/4 bg-gradient-to-b">
        <DialogHeader>
          <DialogTitle className="text-center">add exercise log</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            id="log-form"
            className="space-y-4"
          >
            <div className="grid grid-cols-[2fr_4fr_4fr_1fr] items-center gap-2">
              <p></p>
              <p>reps</p>
              <p>kg</p>
              <p></p>
            </div>
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="grid grid-cols-[2fr_4fr_4fr_1fr] items-center gap-2"
              >
                <span>set {index + 1}</span>

                <FormField
                  control={form.control}
                  name={`logs.${index}.reps`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="sr-only">reps</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="reps"
                          variant="underline"
                          {...field}
                        />
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
                      <FormLabel className="sr-only">weight</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="kg"
                          variant="underline"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {fields.length - 1 === index && index !== 0 && (
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="text-primary"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            ))}
            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => append({ reps: 0, weight: 0 })}
                className="bg-secondary/50 border-secondary border-1 flex w-full justify-center rounded-md p-1"
              >
                <CirclePlus className="h-4 w-4" />
              </button>
            </div>
          </form>
        </Form>
        <DialogFooter>
          <Button type="submit" form="log-form" disabled={loading}>
            {loading ? "saving..." : "save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
