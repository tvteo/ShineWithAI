import { useState } from "react";
import Navbar from "./components/Navbar";
import Topbar from "./components/Topbar";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex">
      {/* Sidebar */}
      <Navbar onToggle={setSidebarOpen} />

      {/* Nội dung */}
      <div
        className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${
          sidebarOpen ? "ml-56" : "ml-16"
        }`}
      >
        {/* Topbar */}
        <Topbar breadcrumbs={["Home", "Dashboard", "Analytics"]} />

        {/* Main content (chiều cao 100%) */}
        <main className="flex-1 p-6 bg-gray-100">
          <h1 className="text-2xl font-bold">Xin chào 👋</h1>
          <p className="mt-2 text-gray-700">
            Nội dung này chiếm toàn bộ phần còn lại của màn hình (100% chiều cao).
          </p>
        </main>
      </div>
    </div>
  );
}

export default App;
