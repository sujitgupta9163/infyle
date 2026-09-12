import { useState } from "react";
import SeriesCard from "../components/series/SeriesCard";
import { useSeries } from "../context/SeriesContext";

const Series = () => {
  const [selectedGenre, setSelectedGenre] = useState('All');
  const { series } = useSeries();
  
  const genres = ['All', 'Sci-Fi', 'Drama', 'Action', 'Thriller', 'Fantasy', 'Comedy', 'Horror'];

  const filteredSeries = selectedGenre === 'All' 
    ? series 
    : series.filter(s => s.genre === selectedGenre);

  return (
    <div className="py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">TV Series</h1>
        <p className="text-gray-500 dark:text-gray-400">Binge-watch the most popular seasons and episodes.</p>
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
        {filteredSeries.length > 0 ? (
          filteredSeries.map((series) => (
            <SeriesCard key={series.id} series={series} />
          ))
        ) : (
          <div className="col-span-full py-20 text-center">
            <p className="text-xl font-semibold text-gray-400 dark:text-gray-500">No series found</p>
            <p className="text-sm text-gray-400 dark:text-gray-600 mt-2">Try selecting a different genre</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Series;
