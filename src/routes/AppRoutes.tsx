import { Routes, Route } from "react-router-dom";
import Contact from "../pages/Contact";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <h1 className="text-2xl font-bold">Xin chào 👋</h1>
            <p className="mt-2 text-gray-700">
              Nội dung này chiếm toàn bộ phần còn lại của màn hình (100% chiều cao).
            </p>
          </>
        }
      />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
};

export default AppRoutes;
