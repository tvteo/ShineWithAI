import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Topbar from "../components/Topbar";

export default function DashboardLayout() {
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

        {/* Main content */}
        <main className="flex-1 p-6 bg-gray-100">
          <Outlet />  {/* 👉 Đây là chỗ các page sẽ hiển thị */}
        </main>
      </div>
    </div>
  );
}
