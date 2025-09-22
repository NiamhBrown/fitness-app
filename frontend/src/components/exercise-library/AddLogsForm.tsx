// import { zodResolver } from "@hookform/resolvers/zod";
// import { useFieldArray, useForm, type Resolver } from "react-hook-form";
// import { z } from "zod";

// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { useAddLog } from "@/hooks/use-addLogs";

// const logFormSchema = z.object({
//   logs: z.array(
//     z.object({
//       reps: z.coerce.number(),
//       weight: z.coerce.number().min(0, "Weight must be 0 or more"),
//     })
//   ),
// });
// interface Props {
//   exerciseId: string;
// }
// export const AddLogsForm = ({ exerciseId }: Props) => {
//   const addLogMutation = useAddLog();
//   const form = useForm<z.infer<typeof logFormSchema>>({
//     resolver: zodResolver(logFormSchema) as Resolver<
//       z.infer<typeof logFormSchema>
//     >, // this fixed the coerce errors
//     defaultValues: {
//       logs: [
//         { reps: 0, weight: 0 },
//         { reps: 0, weight: 0 },
//         { reps: 0, weight: 0 },
//       ],
//     },
//   });
//   const { fields, append, remove } = useFieldArray({
//     control: form.control,
//     name: "logs",
//   });
//   const onSubmit = (data: z.infer<typeof logFormSchema>) => {
//     console.log("✅", data);
//     addLogMutation.mutate({
//       exerciseId,
//       logs: data.logs, // send the entire array at once
//     });
//   };

//   if (addLogMutation.isPending) return <p>Saving log...</p>;
//   if (addLogMutation.isError)
//     return <p>Error saving log: {addLogMutation.error?.message}</p>;
//   if (addLogMutation.isSuccess) return <p>Log saved!</p>;

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//         {fields.map((field, index) => (
//           <div key={field.id} className="grid grid-cols-3 gap-2 items-center">
//             <span>Set {index + 1}</span>

//             <FormField
//               control={form.control}
//               name={`logs.${index}.reps`}
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Reps</FormLabel>
//                   <FormControl>
//                     <Input type="number" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name={`logs.${index}.weight`}
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Weight</FormLabel>
//                   <FormControl>
//                     <Input type="number" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             {fields.length - 1 === index && index !== 0 && (
//               <Button
//                 type="button"
//                 variant="outline"
//                 onClick={() => remove(index)}
//               >
//                 Remove
//               </Button>
//             )}
//           </div>
//         ))}

//         <Button
//           type="button"
//           variant="secondary"
//           onClick={() => append({ reps: 0, weight: 0 })}
//         >
//           Add Row
//         </Button>

//         <Button type="submit">Submit</Button>
//       </form>
//     </Form>
//   );
// };
