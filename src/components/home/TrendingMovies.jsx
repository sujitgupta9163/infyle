import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";

const TrendingMovies = ({ movies }) => {
  return (
    <section className="mt-12">
      <div className="mb-6 flex items-center justify-between px-1">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white/90 drop-shadow-sm transition-colors duration-500">
          Trending Movies
        </h2>

        <Link to="/movies" className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors">
          See All →
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
};

export default TrendingMovies;
