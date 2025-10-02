import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/use-auth";

export const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  console.log("is authed!!!:", isAuthenticated);
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return <Outlet />;
};
