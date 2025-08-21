import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PublicRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-lg font-semibold">
        Đang tải...
      </div>
    );
  }

  return !user ? <Outlet /> : <Navigate to="/" replace />;
}
