import { useState } from "react";
import { supabase } from "../supabaseClient";

export default function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"login" | "signup">("signup");

  const handleAuth = async () => {
    if (mode === "signup") {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) console.error("Signup error:", error);
      else console.log("Signup success:", data);
    } else {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) console.error("Login error:", error);
      else {
        console.log("Login success:", data);
        // this gets stored in local storage (?) so you can access the session and taken in your requests using getSession(), just logging here for debugging/ proof of concept
        console.log("⭐️token:", data.session.access_token);
      }
    }
  };

  return (
    <div>
      <h2>{mode === "signup" ? "Sign Up" : "Login"}</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleAuth}>
        {mode === "signup" ? "Sign Up" : "Login"}
      </button>
      <button onClick={() => setMode(mode === "signup" ? "login" : "signup")}>
        Switch to {mode === "signup" ? "Login" : "Sign Up"}
      </button>
    </div>
  );
}
