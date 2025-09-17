import { useState } from "react";
import { useAuth } from "../hooks/use-auth";

export default function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"login" | "signup">("signup");
  const { signIn, signUp } = useAuth();

  const handleAuth = async () => {
    if (mode === "signup") {
      const { user, error } = await signUp(email, password);
      if (error) console.error("Signup error:", error);
      else console.log("Signup success:", user);
    } else {
      const { user, error } = await signIn(email, password);
      if (error) console.error("Login error:", error);
      else {
        console.log("Login success, user:", user);
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
