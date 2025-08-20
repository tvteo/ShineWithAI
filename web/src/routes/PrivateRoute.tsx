import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { ReactNode } from "react";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) return <p className="text-center">Loading...</p>;
  if (!user) return <Navigate to="/login" replace />;

  return <>{children}</>;
};

export default PrivateRoute;
