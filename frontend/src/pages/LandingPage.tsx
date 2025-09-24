import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";

export const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>STRONGER</h1>
      <h2>welcome to your fitness app</h2>
      <Button onClick={() => navigate("/login")}>log in</Button>
      <Link to={`/signup`}>sign up</Link>
    </div>
  );
};
