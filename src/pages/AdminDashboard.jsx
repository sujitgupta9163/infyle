import { useState } from "react";
import { Link } from "react-router-dom";
import { useMovies } from "../context/MoviesContext";
import { useSeries } from "../context/SeriesContext";
import { PlusCircle, Image as ImageIcon, Film, AlignLeft, Tag, Tv, BarChart, Lock, User, LogOut, Trash2, List } from "lucide-react";

const AdminDashboard = () => {
  const { addMovie, removeMovie, movies } = useMovies();
  const { addSeries, removeSeries, series } = useSeries();
  
  // Login State
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return sessionStorage.getItem("infyleAdminAuth") === "true";
  });
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [loginError, setLoginError] = useState("");

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (loginForm.email === "infyleAdmin@gmail.com" && loginForm.password === "infyleAdmin123") {
      sessionStorage.setItem("infyleAdminAuth", "true");
      setIsLoggedIn(true);
      setLoginError("");
    } else {
      setLoginError("Invalid email or password.");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("infyleAdminAuth");
    setIsLoggedIn(false);
  };

  // Dashboard State
  const [activeTab, setActiveTab] = useState("movie"); // 'movie' or 'series' for form
  const [inventoryTab, setInventoryTab] = useState("movie"); // 'movie' or 'series' for inventory
  const [successMsg, setSuccessMsg] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    genre: "Action",
    image: "",
    seasons: 1,
    episodes: 10
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.image) return;
    
    if (activeTab === "movie") {
      addMovie({
        title: formData.title,
        description: formData.description,
        genre: formData.genre,
        image: formData.image
      });
    } else {
      addSeries({
        title: formData.title,
        description: formData.description,
        genre: formData.genre,
        image: formData.image,
        seasons: parseInt(formData.seasons),
        episodes: parseInt(formData.episodes)
      });
    }
    
    setSuccessMsg(`Successfully added "${formData.title}"!`);
    setTimeout(() => setSuccessMsg(""), 3000);
    
    setFormData({
      title: "",
      description: "",
      genre: "Action",
      image: "",
      seasons: 1,
      episodes: 10
    });
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white dark:bg-[#131620] border border-gray-200 dark:border-gray-800 rounded-3xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="mx-auto h-16 w-16 bg-indigo-100 dark:bg-indigo-500/10 text-indigo-600 rounded-2xl flex items-center justify-center mb-4">
              <Lock className="h-8 w-8" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Login</h1>
            <p className="text-gray-500 mt-2">Sign in to access the dashboard</p>
          </div>
          
          {loginError && (
            <div className="mb-6 p-3 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 text-sm font-medium rounded-xl text-center border border-red-200 dark:border-red-500/20">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Email</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input 
                  type="email" 
                  required
                  value={loginForm.email}
                  onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50 dark:bg-[#1a1d29] border border-gray-200 dark:border-gray-700/50 shadow-inner focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-gray-900 dark:text-white outline-none transition-all"
                  placeholder="admin@example.com"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input 
                  type="password" 
                  required
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50 dark:bg-[#1a1d29] border border-gray-200 dark:border-gray-700/50 shadow-inner focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-gray-900 dark:text-white outline-none transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>
            <button 
              type="submit"
              className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-lg shadow-indigo-500/30 transition-all hover:scale-[1.02] active:scale-[0.98] mt-4"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-3">
            <span className="p-2 bg-indigo-500/10 text-indigo-500 rounded-xl">
              <BarChart className="h-8 w-8" />
            </span>
            Dashboard
          </h1>
          <p className="text-gray-500 dark:text-gray-400">Manage your platform content and statistics.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium transition-colors">
            <LogOut className="h-4 w-4" /> Logout
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
        <div className="bg-white dark:bg-[#131620] border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-xl hover:shadow-indigo-500/10 dark:hover:border-indigo-500/30 transition-all duration-300 flex items-center gap-6">
          <div className="h-16 w-16 bg-blue-500/10 text-blue-500 rounded-2xl flex items-center justify-center shrink-0">
            <Film className="h-8 w-8" />
          </div>
          <div>
            <p className="text-gray-500 dark:text-gray-400 font-medium">Total Movies</p>
            <h3 className="text-4xl font-black text-gray-900 dark:text-white">{movies.length}</h3>
          </div>
        </div>
        <div className="bg-white dark:bg-[#131620] border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-xl hover:shadow-indigo-500/10 dark:hover:border-indigo-500/30 transition-all duration-300 flex items-center gap-6">
          <div className="h-16 w-16 bg-purple-500/10 text-purple-500 rounded-2xl flex items-center justify-center shrink-0">
            <Tv className="h-8 w-8" />
          </div>
          <div>
            <p className="text-gray-500 dark:text-gray-400 font-medium">Total Series</p>
            <h3 className="text-4xl font-black text-gray-900 dark:text-white">{series.length}</h3>
          </div>
        </div>
      </div>
      
      {/* Form Section */}
      <div className="bg-white dark:bg-[#131620] border border-gray-200 dark:border-gray-800 rounded-3xl p-6 md:p-8 shadow-xl">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <PlusCircle className="h-6 w-6 text-indigo-500" />
            Add New Content
          </h2>
          
          <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
            <button 
              onClick={() => setActiveTab('movie')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === 'movie' ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
            >
              Movie
            </button>
            <button 
              onClick={() => setActiveTab('series')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === 'series' ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
            >
              Series
            </button>
          </div>
        </div>

        {successMsg && (
          <div className="mb-6 p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 font-medium flex items-center gap-2 animate-fade-in">
            <span>✅</span> {successMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                {activeTab === 'movie' ? <Film className="h-4 w-4" /> : <Tv className="h-4 w-4" />} 
                {activeTab === 'movie' ? 'Movie Title' : 'Series Title'}
              </label>
              <input 
                type="text" 
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder={`e.g. ${activeTab === 'movie' ? 'Inception' : 'Stranger Things'}`}
                required
                className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-[#1a1d29] border border-gray-200 dark:border-gray-700/50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-gray-900 dark:text-white outline-none transition-all dark:focus:bg-[#1f2233]"
              />
            </div>
            
            {/* Genre */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                <Tag className="h-4 w-4" /> Genre
              </label>
              <select 
                name="genre"
                value={formData.genre}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-[#1a1d29] border border-gray-200 dark:border-gray-700/50 shadow-inner focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-gray-900 dark:text-white outline-none transition-all appearance-none cursor-pointer"
              >
                <option value="Action">Action</option>
                <option value="Sci-Fi">Sci-Fi</option>
                <option value="Drama">Drama</option>
                <option value="Comedy">Comedy</option>
                <option value="Thriller">Thriller</option>
                <option value="Fantasy">Fantasy</option>
                <option value="Horror">Horror</option>
              </select>
            </div>
          </div>
          
          {/* Series Specific Fields */}
          {activeTab === 'series' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 dark:bg-gray-900/50 p-4 rounded-xl border border-gray-100 dark:border-gray-800">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Total Seasons</label>
                <input 
                  type="number" 
                  name="seasons"
                  min="1"
                  value={formData.seasons}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-white dark:bg-[#1a1d29] border border-gray-200 dark:border-gray-700/50 shadow-inner focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-gray-900 dark:text-white outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Total Episodes</label>
                <input 
                  type="number" 
                  name="episodes"
                  min="1"
                  value={formData.episodes}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-white dark:bg-[#1a1d29] border border-gray-200 dark:border-gray-700/50 shadow-inner focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-gray-900 dark:text-white outline-none transition-all"
                />
              </div>
            </div>
          )}
          
          {/* Image URL */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              <ImageIcon className="h-4 w-4" /> Poster Image URL
            </label>
            <input 
              type="url" 
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://images.unsplash.com/photo-..."
              required
              className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-[#1a1d29] border border-gray-200 dark:border-gray-700/50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-gray-900 dark:text-white outline-none transition-all dark:focus:bg-[#1f2233]"
            />
            {formData.image && (
              <div className="mt-3 relative h-32 w-24 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm">
                <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>
          
          {/* Description */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              <AlignLeft className="h-4 w-4" /> Description
            </label>
            <textarea 
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder={`A brief summary of the ${activeTab}...`}
              rows="4"
              className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-[#1a1d29] border border-gray-200 dark:border-gray-700/50 shadow-inner focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-gray-900 dark:text-white outline-none transition-all resize-none"
            ></textarea>
          </div>
          
          {/* Submit Button */}
          <button 
            type="submit"
            className="w-full py-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-lg shadow-lg shadow-indigo-500/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            Add {activeTab === 'movie' ? 'Movie' : 'Series'} to Database
          </button>
        </form>
      </div>

      {/* Content Inventory Section */}
      <div className="mt-12 bg-white dark:bg-[#131620] border border-gray-200 dark:border-gray-800 rounded-3xl p-6 md:p-8 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <List className="h-6 w-6 text-indigo-500" />
            Manage Content
          </h2>

          {/* Inventory Tabs */}
          <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-xl w-full md:w-auto">
            <button 
              onClick={() => setInventoryTab('movie')}
              className={`flex-1 md:flex-none px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${inventoryTab === 'movie' ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
            >
              Movies ({movies.length})
            </button>
            <button 
              onClick={() => setInventoryTab('series')}
              className={`flex-1 md:flex-none px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${inventoryTab === 'series' ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
            >
              Series ({series.length})
            </button>
          </div>
        </div>

        {/* Dynamic Table */}
        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-white/5 border-b border-gray-200 dark:border-gray-800">
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Poster & Title</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Genre</th>
                {inventoryTab === 'series' && <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Details</th>}
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              
              {/* Render Movies */}
              {inventoryTab === 'movie' && movies.length > 0 && movies.map((movie) => (
                <tr key={movie.id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <img src={movie.image} alt={movie.title} className="w-16 h-10 object-cover rounded shadow-sm group-hover:scale-105 transition-transform" />
                      <span className="font-semibold text-gray-900 dark:text-gray-200">{movie.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400">
                      {movie.genre}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => removeMovie(movie.id)}
                      className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-500/10 hover:bg-red-100 dark:hover:bg-red-500/20 rounded-lg transition-colors"
                    >
                      <Trash2 className="h-4 w-4" /> Remove
                    </button>
                  </td>
                </tr>
              ))}
              
              {inventoryTab === 'movie' && movies.length === 0 && (
                <tr>
                  <td colSpan="3" className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">No movies found in database.</td>
                </tr>
              )}

              {/* Render Series */}
              {inventoryTab === 'series' && series.length > 0 && series.map((s) => (
                <tr key={s.id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <img src={s.image} alt={s.title} className="w-16 h-10 object-cover rounded shadow-sm group-hover:scale-105 transition-transform" />
                      <span className="font-semibold text-gray-900 dark:text-gray-200">{s.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-purple-50 dark:bg-purple-500/10 text-purple-700 dark:text-purple-400">
                      {s.genre}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400 font-medium">
                    {s.seasons} Seasons • {s.episodes} Eps
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => removeSeries(s.id)}
                      className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-500/10 hover:bg-red-100 dark:hover:bg-red-500/20 rounded-lg transition-colors"
                    >
                      <Trash2 className="h-4 w-4" /> Remove
                    </button>
                  </td>
                </tr>
              ))}

              {inventoryTab === 'series' && series.length === 0 && (
                <tr>
                  <td colSpan="4" className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">No series found in database.</td>
                </tr>
              )}

            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
