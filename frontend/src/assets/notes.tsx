// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "./AuthContext";

// export const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [isSignUp, setIsSignUp] = useState(false);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const { signIn, signUp } = useAuth();
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     try {
//       if (isSignUp) {
//         const { error } = await signUp(email, password);
//         if (error) throw error;
//         alert("Check your email for verification!");
//       } else {
//         const { data, error } = await signIn(email, password);
//         if (error) throw error;

//         // Navigate to main app on successful login
//         if (data.user) {
//           navigate("/", { replace: true });
//         }
//       }
//     } catch (error) {
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // JSX would go here...
// };
