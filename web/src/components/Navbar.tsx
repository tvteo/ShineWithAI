import { Menu, ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

interface NavbarProps {
  onToggle: (isOpen: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onToggle }) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  // state cho submenu
  const [openLessons, setOpenLessons] = useState(false);
  const [openGames, setOpenGames] = useState(false);
  const [openGroups, setOpenGroups] = useState(false);
  const [openRewards, setOpenRewards] = useState(false);

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
        <span className="font-bold text-lg">
          {isOpen ? "Shine With AI" : ""}
        </span>
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

        {/* Menu cho Bé */}
        <div className="text-xs uppercase text-gray-300 mt-2 mb-1">
          {isOpen && "Cho Bé"}
        </div>

        {/* Dashboard bé */}
        <Link to="/child-dashboard" className="px-3 py-2 rounded-md hover:bg-blue-600 transition">
          🏠 {isOpen && "Dashboard"}
        </Link>

        {/* Bài học */}
        <button
          onClick={() => setOpenLessons(!openLessons)}
          className="flex justify-between items-center px-3 py-2 rounded-md hover:bg-blue-600 transition"
        >
          <span>📚 {isOpen && "Bài học"}</span>
          {isOpen && (openLessons ? <ChevronDown size={16} /> : <ChevronRight size={16} />)}
        </button>
        {openLessons && isOpen && (
          <div className="ml-6 space-y-1 text-sm">
            <Link to="/lessons/language" className="block hover:text-blue-300">🌐Ngôn ngữ</Link>
            <Link to="/lessons/emotion" className="block hover:text-blue-300">😊Cảm xúc</Link>
            <Link to="/lessons/focus" className="block hover:text-blue-300">🧠Tập trung</Link>
            <Link to="/lessons/math" className="block hover:text-blue-300">🔢Toán</Link>
            <Link to="/lessons/life-skills" className="block hover:text-blue-300">🌱Kỹ năng sống</Link>
          </div>
        )}

        {/* Trò chơi */}
        <button
          onClick={() => setOpenGames(!openGames)}
          className="flex justify-between items-center px-3 py-2 rounded-md hover:bg-blue-600 transition"
        >
          <span>🎮 {isOpen && "Trò chơi"}</span>
          {isOpen && (openGames ? <ChevronDown size={16} /> : <ChevronRight size={16} />)}
        </button>
        {openGames && isOpen && (
          <div className="ml-6 space-y-1 text-sm">
            <Link to="/games/memory" className="block hover:text-blue-300">Trí nhớ</Link>
            <Link to="/games/active" className="block hover:text-blue-300">Vận động</Link>
            <Link to="/games/puzzle" className="block hover:text-blue-300">Ghép hình & Tô màu</Link>
            <Link to="/games/co-op" className="block hover:text-blue-300">Hợp tác</Link>
          </div>
        )}

        {/* Học nhóm */}
        <button
          onClick={() => setOpenGroups(!openGroups)}
          className="flex justify-between items-center px-3 py-2 rounded-md hover:bg-blue-600 transition"
        >
          <span>👥 {isOpen && "Học nhóm"}</span>
          {isOpen && (openGroups ? <ChevronDown size={16} /> : <ChevronRight size={16} />)}
        </button>
        {openGroups && isOpen && (
          <div className="ml-6 space-y-1 text-sm">
            <Link to="/groups/create" className="block hover:text-blue-300">Tạo nhóm</Link>
            <Link to="/groups/join" className="block hover:text-blue-300">Tham gia nhóm</Link>
            <Link to="/groups/tasks" className="block hover:text-blue-300">Nhiệm vụ chung</Link>
          </div>
        )}

        {/* Phần thưởng */}
        <button
          onClick={() => setOpenRewards(!openRewards)}
          className="flex justify-between items-center px-3 py-2 rounded-md hover:bg-blue-600 transition"
        >
          <span>🏆 {isOpen && "Phần thưởng"}</span>
          {isOpen && (openRewards ? <ChevronDown size={16} /> : <ChevronRight size={16} />)}
        </button>
        {openRewards && isOpen && (
          <div className="ml-6 space-y-1 text-sm">
            <Link to="/rewards/badges" className="block hover:text-blue-300">Huy hiệu</Link>
            <Link to="/rewards/characters" className="block hover:text-blue-300">Sticker & Nhân vật</Link>
            <Link to="/rewards/collection" className="block hover:text-blue-300">Bộ sưu tập</Link>
          </div>
        )}

        {/* Menu cho Phụ huynh */}
        <div className="text-xs uppercase text-gray-300 mt-4 mb-1">
          {isOpen && "Cho Phụ Huynh"}
        </div>
        <Link to="/parent-dashboard" className="px-3 py-2 rounded-md hover:bg-blue-600 transition">
          📊 {isOpen && "Dashboard"}
        </Link>
        <Link to="/sharing" className="px-3 py-2 rounded-md hover:bg-blue-600 transition">
          💬 {isOpen && "Chia sẻ"}
        </Link>
        <Link to="/ai-assistant" className="px-3 py-2 rounded-md hover:bg-blue-600 transition">
          🤖 {isOpen && "AI Trợ lý"}
        </Link>
        <Link to="/settings" className="px-3 py-2 rounded-md hover:bg-blue-600 transition">
          ⚙️ {isOpen && "Cài đặt"}
        </Link>

        {/* Menu chung */}
        <div className="text-xs uppercase text-gray-300 mt-4 mb-1">
          {isOpen && "Khác"}
        </div>
        <Link to="/contact" className="px-3 py-2 rounded-md hover:bg-blue-600 transition">
          📞 {isOpen && "Liên hệ"}
        </Link>
      </nav>
    </div>
  );
};

export default Navbar;
