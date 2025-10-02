import { AuthForm } from "./AuthForm";

export const SignupPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary to-hivis flex flex-col">
      <AuthForm mode="signup" />
    </div>
  );
};
