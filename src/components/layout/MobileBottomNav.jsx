import { Home, Film, Tv, Plus, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const MobileBottomNav = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-around border-t border-gray-200 dark:border-gray-800 bg-white/90 dark:bg-[#080b14]/90 p-3 pb-safe backdrop-blur-md lg:hidden text-gray-500 dark:text-gray-400 transition-colors duration-500">
      <Link to="/" className={`flex flex-col items-center gap-1 transition ${isActive('/') ? 'text-indigo-600 dark:text-indigo-400' : 'hover:text-gray-900 dark:hover:text-white'}`}>
        <Home className="h-6 w-6" />
        <span className="text-[10px] font-medium">Home</span>
      </Link>
      <Link to="/movies" className={`flex flex-col items-center gap-1 transition ${isActive('/movies') ? 'text-indigo-600 dark:text-indigo-400' : 'hover:text-gray-900 dark:hover:text-white'}`}>
        <Film className="h-6 w-6" />
        <span className="text-[10px] font-medium">Movies</span>
      </Link>
      <Link to="/series" className={`flex flex-col items-center gap-1 transition ${isActive('/series') ? 'text-indigo-600 dark:text-indigo-400' : 'hover:text-gray-900 dark:hover:text-white'}`}>
        <Tv className="h-6 w-6" />
        <span className="text-[10px] font-medium">Series</span>
      </Link>
      <Link to="/mylist" className={`flex flex-col items-center gap-1 transition ${isActive('/mylist') ? 'text-indigo-600 dark:text-indigo-400' : 'hover:text-gray-900 dark:hover:text-white'}`}>
        <Plus className="h-6 w-6" />
        <span className="text-[10px] font-medium">My List</span>
      </Link>
      <Link to="#" className="flex flex-col items-center gap-1 hover:text-gray-900 dark:hover:text-white transition">
        <User className="h-6 w-6" />
        <span className="text-[10px] font-medium">Profile</span>
      </Link>
    </div>
  );
};

export default MobileBottomNav;
