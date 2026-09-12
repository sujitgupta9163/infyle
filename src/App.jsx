import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import Home from "./pages/Home";
import AllMovies from "./pages/AllMovies";
import MovieDetails from "./pages/MovieDetails";
import MyList from "./pages/MyList";
import Series from "./pages/Series";
import SeriesDetails from "./pages/SeriesDetails";
import AdminDashboard from "./pages/AdminDashboard";
import Search from "./pages/Search";
import Sidebar from "./components/layout/Sidebar";
import Header from "./components/layout/Header";
import MobileBottomNav from "./components/layout/MobileBottomNav";
import { MyListProvider } from "./context/MyListContext";
import { MoviesProvider } from "./context/MoviesContext";
import { SeriesProvider } from "./context/SeriesContext";

const Layout = () => {
  return (
    <div className="min-h-screen text-gray-900 dark:text-white font-sans bg-transparent transition-colors duration-500 overflow-x-hidden">
      <Sidebar />
      <main className="lg:ml-60 pb-20 lg:pb-0 flex flex-col min-h-screen">
        <Header />
        <div className="px-4 md:px-8 lg:px-12 pb-10 flex-1">
          <Outlet />
        </div>
      </main>
      <MobileBottomNav />
    </div>
  );
};

function App() {
  return (
    <MoviesProvider>
      <SeriesProvider>
        <MyListProvider>
          <Router>
        <Routes>
          {/* Main User Interface */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="movies" element={<AllMovies />} />
            <Route path="movie/:id" element={<MovieDetails />} />
            <Route path="mylist" element={<MyList />} />
            <Route path="series" element={<Series />} />
            <Route path="series/:id" element={<SeriesDetails />} />
            <Route path="search" element={<Search />} />
            <Route path="admin" element={<AdminDashboard />} />
          </Route>
        </Routes>
      </Router>
      </MyListProvider>
      </SeriesProvider>
    </MoviesProvider>
  );
}

export default App;
