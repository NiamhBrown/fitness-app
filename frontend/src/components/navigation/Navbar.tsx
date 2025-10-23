import { useAuth } from "@/hooks/use-auth";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Menu } from "lucide-react";

export const Navbar = () => {
  const { signOut } = useAuth();

  return (
    <nav className="bg-primary-foreground shadow-xs sticky top-0 flex flex-row justify-between px-6 py-4">
      <div className="bg-primary flex h-12 w-12 rounded-full"></div>

      {/* Desktop Links */}
      <div className="text-primary hidden space-x-6 md:flex">
        <Link
          to="/exercises"
          className="hover:decoration-secondary hover:underline"
        >
          exercises
        </Link>
        <Link
          to="/workouts"
          className="hover:decoration-secondary hover:underline"
        >
          workouts
        </Link>
        <Button variant="secondary" onClick={signOut}>
          logout
        </Button>
      </div>

      {/* Mobile Burger Menu */}
      <div className="md:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="text-primary focus:ring-0 focus-visible:ring-0"
            >
              {/* get this to resize without using ! to force */}
              <Menu className="!h-8 !w-8" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="text-primary bg-primary-foreground"
          >
            <DropdownMenuItem asChild>
              <Link to="/exercises">exercises</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/workouts">workouts</Link>
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={signOut}>logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};
