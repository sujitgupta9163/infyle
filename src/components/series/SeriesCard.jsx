import { Link } from "react-router-dom";

const SeriesCard = ({ series }) => {
  return (
    <Link to={`/series/${series.id}`} className="group cursor-pointer flex flex-col">
      <div className="relative aspect-[2/3] overflow-hidden rounded-xl bg-slate-800 shadow-md transition-all duration-300 group-hover:shadow-indigo-500/20 group-hover:shadow-xl group-hover:-translate-y-1">
        <img
          src={series.image}
          alt={series.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
        />

        <div className="absolute top-2 left-2 px-2 py-1 bg-black/60 backdrop-blur-md rounded text-[10px] font-bold text-white uppercase tracking-wider">
          {series.seasons} Seasons
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <button className="absolute bottom-4 left-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-black opacity-0 transition-all duration-300 group-hover:opacity-100 hover:scale-110 hover:bg-indigo-500 hover:text-white shadow-lg">
          <span className="ml-1 text-lg">▶</span>
        </button>
      </div>

      <div className="mt-3 px-1">
        <h3 className="truncate text-sm font-semibold text-gray-800 dark:text-gray-100 group-hover:text-indigo-600 dark:group-hover:text-white transition-colors">
          {series.title}
        </h3>
        <p className="text-xs text-gray-500 mt-1 flex items-center justify-between">
          <span>{series.genre}</span>
          <span className="font-medium">{series.episodes} Eps</span>
        </p>
      </div>
    </Link>
  );
};

export default SeriesCard;
