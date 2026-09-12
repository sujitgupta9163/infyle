import { Search as SearchIcon, Bell, Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";

const Header = () => {
  const [isDark, setIsDark] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState("");

  // Sync search input with URL if on search page
  useEffect(() => {
    if (location.pathname === "/search") {
      setQuery(searchParams.get("q") || "");
    } else {
      setQuery("");
    }
  }, [location, searchParams]);

  useEffect(() => {
    if (isDark) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDark]);

  const handleSearch = (e) => {
    const val = e.target.value;
    setQuery(val);
    if (val.trim()) {
      navigate(`/search?q=${encodeURIComponent(val)}`);
    } else if (location.pathname === "/search") {
      // If empty and on search page, just go to search without query
      navigate(`/search`);
    }
  };

  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.profile-menu-container')) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between bg-white/80 dark:bg-[#080b14]/80 px-4 py-5 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800/50 transition-all">
      {/* Search Bar */}
      <div className="flex w-full max-w-xl items-center rounded-2xl bg-gray-100 dark:bg-[#131620] px-5 py-2.5 border border-transparent dark:border-gray-800/60 shadow-inner focus-within:border-indigo-500/50 dark:focus-within:bg-[#181b28] focus-within:bg-white focus-within:shadow-indigo-500/10 transition-all">
        <SearchIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder="Search for movies, series..."
          className="ml-3 w-full bg-transparent text-sm text-gray-900 dark:text-white placeholder-gray-500 outline-none"
        />
      </div>

      {/* Right Actions */}
      <div className="ml-4 flex items-center gap-6">
        <button 
          onClick={() => setIsDark(!isDark)}
          className="relative text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-white transition-colors hidden sm:block"
        >
          {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>

        <button className="relative text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors hidden sm:block">
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-red-500 border-2 border-white dark:border-[#080b14]"></span>
        </button>
        
        <div className="relative profile-menu-container">
          <div 
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-3 cursor-pointer group hover:bg-black/5 dark:hover:bg-white/5 p-1.5 rounded-full transition-all"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-sm font-bold text-white shadow-md shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-all">
              S
            </div>
            <span className="hidden text-sm font-semibold text-gray-700 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white md:block transition-colors">Sujit</span>
            <span className="text-gray-400 dark:text-gray-500 text-xs hidden md:block group-hover:text-gray-600 dark:group-hover:text-gray-300">▼</span>
          </div>

          {/* Dropdown Menu */}
          {showProfileMenu && (
            <div className="absolute right-0 mt-3 w-48 rounded-xl bg-white dark:bg-[#131620] py-2 shadow-xl ring-1 ring-black/5 dark:ring-white/10 animate-fade-in origin-top-right">
              <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-800/60 md:hidden">
                <p className="text-sm font-semibold text-gray-900 dark:text-white">Sujit Gupta</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">sujit@infyle.com</p>
              </div>
              
              <button className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-2">
                User Profile
              </button>
              <button className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-2">
                Settings
              </button>
              
              <div className="my-1 border-t border-gray-100 dark:border-gray-800/60"></div>
              
              <button 
                onClick={() => {
                  setShowProfileMenu(false);
                  navigate("/admin");
                }}
                className="w-full text-left px-4 py-2 text-sm font-medium text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-500/10 transition-colors flex items-center gap-2"
              >
                Go to Admin Panel
              </button>
              
              <div className="my-1 border-t border-gray-100 dark:border-gray-800/60"></div>
              
              <button className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors flex items-center gap-2">
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
