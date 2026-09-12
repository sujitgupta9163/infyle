import ContinueWatchingCard from "./ContinueWatchingCard";

const ContinueWatching = ({ movies }) => {
  return (
    <section className="mt-12">
      <div className="mb-6 flex items-center justify-between px-1">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white/90 drop-shadow-sm transition-colors duration-500">
          Continue Watching
        </h2>

        <button className="text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors">
          See All →
        </button>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {movies.map((item) => (
          <ContinueWatchingCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
};

export default ContinueWatching;
