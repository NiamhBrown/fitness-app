import { useState } from "react";
import { useAuth } from "../hooks/use-auth";
import { Link } from "react-router-dom";

interface AuthFormProps {
  mode: "login" | "signup";
}
export const AuthForm = ({ mode }: AuthFormProps) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn, signUp } = useAuth();

  const handleAuth = async () => {
    if (mode === "signup") {
      const { user, error } = await signUp(
        firstName,
        lastName,
        email,
        password
      );
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
      <h2>{mode === "signup" ? "create an account" : "welcome back 😊"}</h2>
      {mode === "signup" && (
        <>
          <input
            type="text"
            placeholder="first name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            placeholder="last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </>
      )}
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
        {mode === "signup" ? "signup" : "login"}
      </button>
      {mode === "signup" ? (
        <Link to="/login">Already have an account? Log in here</Link>
      ) : (
        <Link to="/signup">Don’t have an account yet? Sign up here</Link>
      )}
    </div>
  );
};
