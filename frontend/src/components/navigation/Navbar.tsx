import { useAuth } from "@/hooks/use-auth";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export const Navbar = () => {
  const { signOut } = useAuth();

  return (
    <nav className="bg-primary-foreground shadow-xs sticky top-0 flex flex-row justify-between px-6 py-4">
      <div className="bg-primary flex h-12 w-12 rounded-full"></div>

      {/* Desktop Links */}
      <div className="hidden space-x-6 md:flex">
        <Link to="/exercises" className="hover:text-primary">
          exercises
        </Link>
        <Link to="/workouts" className="hover:text-primary">
          workouts
        </Link>
        <Button variant="outline" onClick={signOut}>
          logout
        </Button>
      </div>

      {/* Mobile Burger Menu */}
      <div className="md:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
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
