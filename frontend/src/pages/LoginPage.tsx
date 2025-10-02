import { AuthForm } from "./AuthForm";

export const LoginPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary to-hivis flex flex-col">
      <AuthForm mode="login" />
    </div>
  );
};
