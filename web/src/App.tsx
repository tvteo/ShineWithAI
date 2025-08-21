import { useAuth } from "./context/AuthContext";
import AppRoutes from "./routes/AppRoutes";

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Đang tải...</div>;
  }

  return <AppRoutes />;
}

export default App;
