// export const AuthRedirect = ({ children }) => {
//   const { user, loading } = useAuth();

//   if (loading) return <div>Loading...</div>;

//   // If user is logged in, redirect to main app
//   if (user) {
//     return <Navigate to="/" replace />;
//   }

//   // Show login/signup pages
//   return children;
// };
