// import { Navigate } from "react-router-dom";
// import { useAuth } from "./AuthProvider";

// export const ProtectedRoute = ({ children }) => {
//   const { user, loading } = useAuth();

//   // Show loading while checking auth status
//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-lg">Loading...</div>
//       </div>
//     );
//   }

//   // Redirect to login if not authenticated
//   if (!user) {
//     return <Navigate to="/login" replace />;
//   }

//   // Render protected content
//   return children;
// };
