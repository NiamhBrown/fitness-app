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
        signupData.password
      );
      if (error) {
        form.setError("password", { type: "server", message: error });
        console.error("Signup error:", error);
      } else {
        console.log("Signup success:", user);
        navigate("/exercise-library");
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
        navigate("/exercise-library");
      }
    }
  };

  return (
    <div className="min-h-screen grid grid-rows-[auto_1fr_auto]">
      <div className="pt-44 flex justify-center">
        <h2 className="text-4xl sm:text-6xl text-center font-heading text-primary-foreground">
          {mode === "signup" ? "create an account" : "welcome back"}
        </h2>
      </div>

      <div className="flex items-center justify-center text-primary">
        <div className="flex flex-col items-center gap-7 font-body  w-80 md:w-full max-w-md">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleAuth)}
              className="flex flex-col gap-6 w-full"
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

              <div className="flex flex-col items-center gap-3 mt-5">
                <Button
                  type="submit"
                  disabled={form.formState.isSubmitting}
                  className="w-full max-w-xs rounded-2xl bg-primary-foreground text-primary hover:bg-hivis"
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
        <h1 className="text-secondary w-full text-center text-6xl font-heading relative translate-y-4 overflow-hidden opacity-40 sm:hidden">
          STRONGER
        </h1>
      </div>
    </div>
  );
};
