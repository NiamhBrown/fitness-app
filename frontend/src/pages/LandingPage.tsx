import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";

export const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-primary flex min-h-screen flex-col">
      <div className="text-primary-foreground flex flex-1 flex-col items-center justify-center">
        <h1 className="text-hivis font-heading text-center text-[3.5rem] sm:text-6xl md:text-7xl">
          STRONGER
        </h1>
        <h2 className="font-body mt-1 text-2xl md:mt-5">
          track progress. build strength.
        </h2>
      </div>

      <div className="mb-30 font-body flex flex-col items-center gap-3">
        <Button
          className="text-primary bg-primary-foreground hover:bg-hivis w-full max-w-xs rounded-xl"
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
