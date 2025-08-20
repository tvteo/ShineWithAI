import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Contact from "../pages/Contact";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import PrivateRoute from "./PrivateRoute";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Trang public */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />

      {/* Trang private */}
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
      <Route
        path="/contact"
        element={
          <PrivateRoute>
            <Contact />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
