import { useState } from "react";
import MovieCard from "../components/home/MovieCard";
import { useMovies } from "../context/MoviesContext";

const AllMovies = () => {
  const [selectedGenre, setSelectedGenre] = useState('All');
  const { movies } = useMovies();
  
  const genres = ['All', 'Action', 'Sci-Fi', 'Drama', 'Comedy', 'Thriller', 'Fantasy', 'Horror'];

  const filteredMovies = selectedGenre === 'All' 
    ? movies 
    : movies.filter(movie => movie.genre === selectedGenre);

  return (
    <div className="py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">All Movies</h1>
        <p className="text-gray-500 dark:text-gray-400">Browse through our entire collection of trending and classic movies.</p>
      </div>

      {/* Filter Pills */}
      <div className="mb-8 flex gap-3 overflow-x-auto pt-2 pb-4 px-1 -mx-1 scrollbar-hide">
        {genres.map(genre => (
          <button
            key={genre}
            onClick={() => setSelectedGenre(genre)}
            className={`px-6 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-300 ${
              selectedGenre === genre
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/40 scale-105'
                : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 hover:scale-105 dark:bg-[#131620] dark:border-gray-800 dark:text-gray-300 dark:hover:bg-[#1a1d29]'
            }`}
          >
            {genre}
          </button>
        ))}
      </div>
      
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))
        ) : (
          <div className="col-span-full py-20 text-center">
            <p className="text-xl font-semibold text-gray-400 dark:text-gray-500">No movies found</p>
            <p className="text-sm text-gray-400 dark:text-gray-600 mt-2">Try selecting a different genre</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllMovies;
