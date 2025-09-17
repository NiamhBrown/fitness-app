import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/use-auth";

export const PublicRoute = () => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) return <div>Loading...</div>;

  if (isAuthenticated) {
    const from = location.state?.from ?? "/";
    return <Navigate to={from} replace />;
  }

  return <Outlet />;
};
