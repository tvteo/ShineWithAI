import { FaUserCircle, FaBell, FaQuestionCircle } from "react-icons/fa";

interface TopbarProps {
  breadcrumbs: string[];
}

const Topbar: React.FC<TopbarProps> = ({ breadcrumbs }) => {
  return (
    <header className="w-full h-14 flex items-center justify-between bg-white shadow px-4">
      {/* Breadcrumbs bên trái */}
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

      {/* Icon menu bên phải */}
      <div className="flex items-center space-x-4 text-gray-600 text-xl">
        <button className="hover:text-blue-600">
          <FaBell />
        </button>
        <button className="hover:text-blue-600">
          <FaQuestionCircle />
        </button>
        <button className="hover:text-blue-600">
          <FaUserCircle />
        </button>
      </div>
    </header>
  );
};

export default Topbar;
