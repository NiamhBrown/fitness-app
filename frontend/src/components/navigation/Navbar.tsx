import { useAuth } from "@/hooks/use-auth";

export const Navbar = () => {
  const { signOut } = useAuth();

  return (
    <nav className="bg-primary-foreground shadow-xs sticky top-0 flex flex-row justify-between px-6 py-4">
      <div className="bg-primary flex h-12 w-12 rounded-full"></div>
      <div className="text-primary flex hover:underline sm:text-2xl">
        <button onClick={signOut}>logout</button>
      </div>
    </nav>
  );
};
