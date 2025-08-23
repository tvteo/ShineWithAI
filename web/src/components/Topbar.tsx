import { useState } from "react";
import { FaUserCircle, FaBell, FaQuestionCircle, FaSignOutAlt, FaEdit } from "react-icons/fa";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

interface TopbarProps {
  breadcrumbs: string[];
}

const Topbar: React.FC<TopbarProps> = ({ breadcrumbs }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const user = auth.currentUser; // lấy thông tin user Firebase

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Đăng xuất thất bại:", error);
    }
  };

  return (
    <header className="w-full h-14 flex items-center justify-between bg-white shadow px-4 relative">
      {/* Breadcrumbs */}
      <nav className="flex items-center text-gray-600 text-sm space-x-2">
        {breadcrumbs.map((crumb, index) => (
          <span key={index} className="flex items-center">
            <span>{crumb}</span>
            {index < breadcrumbs.length - 1 && (
              <span className="mx-2 text-gray-400">/</span>
            )}
          </span>
        ))}
      </nav>

      {/* Icons bên phải */}
      <div className="flex items-center space-x-4 text-gray-600 text-xl">
        <button className="hover:text-blue-600">
          <FaBell />
        </button>
        <button className="hover:text-blue-600">
          <FaQuestionCircle />
        </button>

        {/* User Menu */}
        <div className="relative">
          <button
            className="w-8 h-8 rounded-full overflow-hidden border border-gray-300 flex items-center justify-center hover:ring-2 hover:ring-blue-400"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt="User Avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              <FaUserCircle className="text-gray-500 w-7 h-7" />
            )}
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-52 bg-white border rounded-lg shadow-lg overflow-hidden z-50">
              <div className="px-4 py-3 border-b">
                <p className="text-sm font-medium text-gray-700">
                  {user?.displayName || "Người dùng"}
                </p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>

              <button
                className="w-full flex items-center gap-2 px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                onClick={() => {
                  setMenuOpen(false);
                  navigate("/profile");
                }}
              >
                <FaEdit className="text-blue-500" />
                Cập nhật
              </button>
              <button
                className="w-full flex items-center gap-2 px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                onClick={handleLogout}
              >
                <FaSignOutAlt className="text-red-500" />
                Đăng xuất
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Topbar;
