import { Home, Film, Tv, Plus, Download, Settings, HelpCircle, Play } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-60 flex-col border-r border-gray-200 dark:border-gray-800/60 bg-white/95 dark:bg-[#080b14]/95 backdrop-blur-xl lg:flex transition-colors duration-500">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-3 px-8 py-8 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/20">
          <Play className="h-5 w-5 fill-current ml-0.5" />
        </div>
        InfyleOTT
      </Link>

      {/* Nav Links */}
      <nav className="flex-1 space-y-2 px-4">
        <Link to="/" className={`group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all ${isActive('/') ? 'bg-indigo-50 dark:bg-gradient-to-r dark:from-indigo-500/10 dark:to-purple-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/20' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-white border border-transparent'}`}>
          <Home className={`h-5 w-5 group-hover:scale-110 transition-transform ${isActive('/') ? 'text-indigo-600 dark:text-indigo-400' : ''}`} />
          Home
        </Link>
        <Link to="/movies" className={`group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all ${isActive('/movies') ? 'bg-indigo-50 dark:bg-gradient-to-r dark:from-indigo-500/10 dark:to-purple-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/20' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-white border border-transparent'}`}>
          <Film className={`h-5 w-5 group-hover:scale-110 transition-transform ${isActive('/movies') ? 'text-indigo-600 dark:text-indigo-400' : ''}`} />
          Movies
        </Link>
        <Link to="/series" className={`group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all ${isActive('/series') ? 'bg-indigo-50 dark:bg-gradient-to-r dark:from-indigo-500/10 dark:to-purple-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/20' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-white border border-transparent'}`}>
          <Tv className={`h-5 w-5 group-hover:scale-110 transition-transform ${isActive('/series') ? 'text-indigo-600 dark:text-indigo-400' : ''}`} />
          Series
        </Link>
        <Link to="/mylist" className={`group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all ${isActive('/mylist') ? 'bg-indigo-50 dark:bg-gradient-to-r dark:from-indigo-500/10 dark:to-purple-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/20' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-white border border-transparent'}`}>
          <Plus className={`h-5 w-5 group-hover:scale-110 transition-transform ${isActive('/mylist') ? 'text-indigo-600 dark:text-indigo-400' : ''}`} />
          My List
        </Link>
        <a href="#" className="group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-white transition-all">
          <Download className="h-5 w-5 group-hover:scale-110 transition-transform" />
          Downloads
        </a>
      </nav>

      {/* Bottom Links */}
      <div className="mb-8 space-y-2 px-4">
        <Link to="/admin" className={`group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all ${isActive('/admin') ? 'bg-indigo-50 dark:bg-gradient-to-r dark:from-indigo-500/10 dark:to-purple-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/20' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-white border border-transparent'}`}>
          <Settings className={`h-5 w-5 group-hover:scale-110 transition-transform ${isActive('/admin') ? 'text-indigo-600 dark:text-indigo-400' : ''}`} />
          Admin Panel
        </Link>
        <a href="#" className="group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-white transition-all">
          <HelpCircle className="h-5 w-5 group-hover:scale-110 transition-transform" />
          Help & Support
        </a>
      </div>
    </aside>
  );
};

export default Sidebar;
