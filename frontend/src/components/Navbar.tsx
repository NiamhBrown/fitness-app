import { useAuth } from "@/hooks/use-auth";

export const Navbar = () => {
  const { signOut } = useAuth();

  return (
    <div className=" flex flex-row px-6 py-4 justify-between">
      <div className="bg-primary w-12 h-12 rounded-full flex "></div>
      <div className=" flex text-primary hover:underline">
        <button onClick={signOut}>logout</button>
      </div>
    </div>
  );
};
