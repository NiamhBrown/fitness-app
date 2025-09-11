import { supabase } from "../supabaseClient";

export const Navbar = () => {
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.error("Logout error:", error);
  };

  return (
    <>
      <button onClick={handleLogout}>Logout</button>
      <p>NAVBAR</p>
    </>
  );
};
