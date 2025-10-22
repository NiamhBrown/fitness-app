import { FormFieldWrapper } from "@/components/FormFieldWrapper";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as z from "zod";
import { useAuth } from "../hooks/use-auth";

interface AuthFormProps {
  mode: "login" | "signup";
}

const loginSchema = z.object({
  email: z.email("email is invalid"),
  password: z.string().min(6, "password must be > 6 characters"),
});

const signupSchema = loginSchema.extend({
  firstName: z.string().min(1, "first name is required"),
  lastName: z.string().min(1, "last name is required"),
});
type LoginFormValues = z.infer<typeof loginSchema>;
type SignupFormValues = z.infer<typeof signupSchema>;
type FormValues = SignupFormValues | LoginFormValues;

export const AuthForm = ({ mode }: AuthFormProps) => {
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  const schema = mode === "signup" ? signupSchema : loginSchema;

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
      ...(mode === "signup" && { firstName: "", lastName: "" }),
    },
  });

  const handleAuth = async (data: SignupFormValues | LoginFormValues) => {
    if (mode === "signup") {
      // a quick fix for now?
      const signupData = data as SignupFormValues;
      const { user, error } = await signUp(
        signupData.firstName,
        signupData.lastName,
        signupData.email,
        signupData.password,
      );
      if (error) {
        form.setError("password", { type: "server", message: error });
        console.error("Signup error:", error);
      } else {
        console.log("Signup success:", user);
        navigate("/exercises");
      }
    } else {
      const loginData = data as LoginFormValues;
      const { user, error } = await signIn(loginData.email, loginData.password);
      if (error) {
        form.setError("password", { type: "server", message: error });
        console.error("Login error:", error);
        return;
      } else {
        console.log("Login success, user:", user);
        navigate("/exercises");
      }
    }
  };

  return (
    <div className="grid min-h-screen grid-rows-[auto_1fr_auto]">
      <div className="flex justify-center pt-44">
        <h2 className="font-heading text-primary-foreground text-center text-4xl sm:text-6xl">
          {mode === "signup" ? "create an account" : "welcome back"}
        </h2>
      </div>

      <div className="text-primary flex items-center justify-center">
        <div className="font-body flex w-80 max-w-md flex-col items-center gap-7 md:w-full">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleAuth)}
              className="flex w-full flex-col gap-6"
            >
              {mode === "signup" && (
                <>
                  <FormFieldWrapper
                    control={form.control}
                    name={"firstName" as keyof FormValues}
                    label="first name"
                    variant={"underline"}
                  />
                  <FormFieldWrapper
                    control={form.control}
                    name={"lastName" as keyof FormValues}
                    label="last name"
                    variant={"underline"}
                  />
                </>
              )}
              <FormFieldWrapper
                control={form.control}
                name="email"
                label="email"
                variant={"underline"}
              />
              <FormFieldWrapper
                control={form.control}
                name="password"
                label="password"
                type="password"
                variant={"underline"}
              />

              <div className="mt-5 flex flex-col items-center gap-3">
                <Button
                  type="submit"
                  disabled={form.formState.isSubmitting}
                  className="bg-primary-foreground text-primary hover:bg-hivis w-full max-w-xs rounded-2xl"
                >
                  {form.formState.isSubmitting
                    ? mode === "signup"
                      ? "signing up..."
                      : "logging in..."
                    : mode === "signup"
                      ? "signup"
                      : "login"}
                </Button>
                {mode === "signup" ? (
                  <Link to="/login" className="hover:underline">
                    already have an account? login here
                  </Link>
                ) : (
                  <Link to="/signup" className="hover:underline">
                    don’t have an account yet? signup here
                  </Link>
                )}
              </div>
            </form>
          </Form>
        </div>
      </div>

      <div className="relative overflow-hidden">
        <h1 className="text-secondary font-heading relative w-full translate-y-4 overflow-hidden text-center text-6xl opacity-40 sm:hidden">
          STRONGER
        </h1>
      </div>
    </div>
  );
};
