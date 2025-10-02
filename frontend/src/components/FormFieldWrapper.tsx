import type { Control, FieldValues, Path } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

type Props<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  type?: string;
  variant?: "default" | "underline" | null | undefined;
};
export const FormFieldWrapper = <T extends FieldValues>({
  name,
  label,
  control,
  type = "text",
  variant,
}: Props<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="sr-only">{label}</FormLabel>
          <FormControl>
            <Input
              type={type}
              {...field}
              placeholder={label}
              variant={variant}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
