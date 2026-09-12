const ContinueWatchingCard = ({ item }) => {
  return (
    <div className="group cursor-pointer flex-none w-[260px] sm:w-[300px] md:w-[340px]">
      <div className="relative aspect-video overflow-hidden rounded-xl bg-slate-800 shadow-md transition-all duration-300 group-hover:shadow-indigo-500/20 group-hover:shadow-xl group-hover:-translate-y-1 border border-white/5">
        <img
          src={item.image}
          alt={item.title}
          onError={(e) => { e.target.onerror = null; e.target.src = "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=800&auto=format&fit=crop"; }}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-90 group-hover:opacity-100"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-black/40 backdrop-blur-[2px]">
           <button className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-black transition-transform hover:scale-110 hover:bg-indigo-500 hover:text-white shadow-lg">
             <span className="ml-1 text-xl">▶</span>
           </button>
        </div>
        
        <div className="absolute bottom-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-xl hover:text-indigo-400">⋮</span>
        </div>

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 h-1 w-full bg-gray-800/80 backdrop-blur-md">
          <div className="h-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.8)]" style={{ width: `${item.progress}%` }} />
        </div>
      </div>

      <div className="mt-3 px-1">
        <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100 group-hover:text-indigo-600 dark:group-hover:text-white transition-colors">{item.title}</h3>
        <p className="text-xs text-gray-500 mt-1 font-medium tracking-wide">{item.episode} <span className="mx-1">•</span> <span className="text-indigo-500 dark:text-indigo-400/80">{item.timeLeft}</span></p>
      </div>
    </div>
  );
};

export default ContinueWatchingCard;
