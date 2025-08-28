import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Topbar from "../components/Topbar";

export default function FullLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen overflow-hidden">
      {/* Sidebar */}
      <Navbar onToggle={setSidebarOpen} />

      {/* Nội dung */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          sidebarOpen ? "ml-56" : "ml-16"
        }`}
      >
        {/* Topbar */}
        <Topbar breadcrumbs={["Home", "Dashboard", "Analytics"]} />

        {/* Main content */}
        <main className="flex-1 bg-gray-100 p-6 overflow-y-auto">
          <Outlet /> {/* 👉 Đây là chỗ các page sẽ hiển thị */}
        </main>
      </div>
    </div>
  );
}
