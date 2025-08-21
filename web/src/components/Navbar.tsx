import { Menu } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

interface NavbarProps {
  onToggle: (isOpen: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onToggle }) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const toggleSidebar = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    onToggle(newState);
  };

  return (
    <div
      className={`h-screen bg-blue-900 text-white fixed top-0 left-0 transition-all duration-300 
        ${isOpen ? "w-56" : "w-16"}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between bg-blue-700 px-4 py-3">
        <span className="font-bold text-lg">{isOpen ? "Shine With AI" : ""}</span>
        <button
          onClick={toggleSidebar}
          className="cursor-pointer p-2 border border-white rounded-md 
                    hover:bg-white hover:text-blue-700 transition 
                    focus:outline-none focus:ring-2 focus:ring-white"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Nav links */}
      <nav className="flex flex-col p-3 space-y-2">
        <Link
          to="/"
          className="px-3 py-2 rounded-md hover:bg-blue-600 transition"
        >
          🏠 {isOpen && "Trang chủ"}
        </Link>
        <Link
          to="/about"
          className="px-3 py-2 rounded-md hover:bg-blue-600 transition"
        >
          ℹ️ {isOpen && "Thông tin"}
        </Link>
        <Link
          to="/contact"
          className="px-3 py-2 rounded-md hover:bg-blue-600 transition"
        >
          📞 {isOpen && "Liên hệ"}
        </Link>
      </nav>
    </div>
  );
};

export default Navbar;
