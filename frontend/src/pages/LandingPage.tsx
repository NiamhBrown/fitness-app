import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";

export const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col bg-primary">
      <div className="flex-1 flex flex-col items-center justify-center text-primary-foreground">
        <h1 className="text-[3.5rem] sm:text-6xl md:text-7xl text-hivis font-heading text-center">
          STRONGER
        </h1>
        <h2 className="mt-1 md:mt-5 font-body text-2xl">
          track progress. build strength.
        </h2>
      </div>

      <div className="flex flex-col items-center gap-3 mb-30 font-body">
        <Button
          className="w-full max-w-xs text-primary rounded-2xl bg-primary-foreground hover:bg-hivis"
          onClick={() => navigate("/login")}
        >
          log in
        </Button>
        <Link
          to={`/signup`}
          className="text-primary-foreground hover:text-hivis"
        >
          don't have an account yet? sign up
        </Link>
      </div>
    </div>
  );
};
