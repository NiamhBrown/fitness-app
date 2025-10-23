import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/use-auth";

export const PublicRoute = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (isAuthenticated) {
    const from = location.state?.from ?? "/exercises";
    return <Navigate to={from} replace />;
  }

  return <Outlet />;
};
