import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useMovies } from "../context/MoviesContext";
import { useSeries } from "../context/SeriesContext";
import MovieCard from "../components/home/MovieCard";
import SeriesCard from "../components/series/SeriesCard";
import { Search as SearchIcon } from "lucide-react";

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const { movies } = useMovies();
  const { series } = useSeries();

  const [movieResults, setMovieResults] = useState([]);
  const [seriesResults, setSeriesResults] = useState([]);

  useEffect(() => {
    if (!query.trim()) {
      setMovieResults([]);
      setSeriesResults([]);
      return;
    }

    const lowerQuery = query.toLowerCase();

    const filteredMovies = movies.filter(
      (m) =>
        m.title.toLowerCase().includes(lowerQuery) ||
        m.genre.toLowerCase().includes(lowerQuery)
    );
    
    const filteredSeries = series.filter(
      (s) =>
        s.title.toLowerCase().includes(lowerQuery) ||
        s.genre.toLowerCase().includes(lowerQuery)
    );

    setMovieResults(filteredMovies);
    setSeriesResults(filteredSeries);
  }, [query, movies, series]);

  const hasResults = movieResults.length > 0 || seriesResults.length > 0;

  return (
    <div className="py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Search Results</h1>
        <p className="text-gray-500 dark:text-gray-400">
          {query ? `Showing results for "${query}"` : "Enter a search term to find movies and series."}
        </p>
      </div>

      {!hasResults && query && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-20 h-20 mb-6 bg-gray-100 dark:bg-white/5 rounded-full flex items-center justify-center">
            <SearchIcon className="h-10 w-10 text-gray-400 dark:text-gray-500" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-2">No results found</h2>
          <p className="text-gray-500 dark:text-gray-500 max-w-md mx-auto">
            We couldn't find anything matching "{query}". Try searching for a different title or genre.
          </p>
        </div>
      )}

      {movieResults.length > 0 && (
        <div className="mb-12">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-6 border-l-4 border-indigo-500 pl-3">Movies</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {movieResults.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      )}

      {seriesResults.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-6 border-l-4 border-purple-500 pl-3">TV Series</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {seriesResults.map((s) => (
              <SeriesCard key={s.id} series={s} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
