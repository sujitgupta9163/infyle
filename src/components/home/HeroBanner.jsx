import { useState, useEffect } from "react";
import { heroMovies } from "../../data/movies";

const HeroBanner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroMovies.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const heroMovie = heroMovies[currentIndex];

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % heroMovies.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + heroMovies.length) % heroMovies.length);

  return (
    <div className="relative mt-6 w-full overflow-hidden rounded-3xl bg-gray-200 dark:bg-slate-900 h-[480px] sm:h-[500px] md:h-[550px] lg:h-[650px] shadow-xl dark:shadow-2xl shadow-gray-200 dark:shadow-black/50 border border-gray-200 dark:border-white/5 transition-colors duration-500">
      <img
        key={heroMovie.id}
        src={heroMovie.image}
        alt={heroMovie.title}
        className="absolute inset-0 h-full w-full object-cover opacity-90 dark:opacity-80 animate-fade-in"
        style={{ animation: 'fadeIn 0.5s ease-in-out' }}
      />
      
      {/* Premium Gradients */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 dark:from-[#05060b]/95 dark:via-[#05060b]/80 to-transparent transition-colors duration-500 w-full md:w-3/4" />
      <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 dark:from-[#05060b] dark:via-[#05060b]/80 to-transparent transition-colors duration-500 md:opacity-50" />

      <div className="absolute inset-0 flex flex-col justify-end pb-14 md:justify-center md:pb-0 px-5 md:px-16 w-full md:w-3/4 lg:w-2/3">
        {heroMovie.trending && (
          <div className="mb-2 flex items-center gap-1.5 text-[10px] md:text-sm font-bold tracking-wider text-red-500/90 drop-shadow-md uppercase">
            <span className="text-sm md:text-lg animate-pulse">🔥</span> Trending Now
          </div>
        )}
        <h1 className="mb-2 md:mb-4 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl drop-shadow-xl transition-colors duration-500 leading-tight line-clamp-2 md:line-clamp-none">
          {heroMovie.title}
        </h1>
        <p className="mb-5 md:mb-8 max-w-xl text-xs text-gray-700 dark:text-gray-300 sm:text-base md:text-lg drop-shadow-md leading-relaxed transition-colors duration-500 line-clamp-2 md:line-clamp-3">
          {heroMovie.description}
        </p>
        
        <div className="flex flex-wrap gap-2 md:gap-4">
          <button className="group flex items-center gap-1.5 md:gap-3 rounded-full bg-gray-900 dark:bg-white px-4 py-1.5 md:px-8 md:py-3.5 text-xs md:text-base font-bold text-white dark:text-black transition-all hover:bg-indigo-600 hover:text-white shadow-lg hover:shadow-indigo-500/30">
            <span className="text-sm md:text-xl group-hover:scale-110 transition-transform">▶</span> 
            Play Now
          </button>
          <button className="flex items-center gap-1.5 rounded-full border border-gray-300 dark:border-gray-500/50 bg-white/50 dark:bg-gray-900/50 backdrop-blur-md px-4 py-1.5 md:px-8 md:py-3.5 text-xs md:text-base font-bold text-gray-900 dark:text-white transition-all hover:bg-gray-100 dark:hover:bg-gray-800/80 hover:border-gray-400">
            <span className="text-sm md:text-lg">ⓘ</span> 
            More Info
          </button>
        </div>
      </div>
      
      {/* Dots indicator */}
      <div className="absolute bottom-3 md:bottom-6 left-1/2 flex -translate-x-1/2 gap-2 md:gap-3 z-20">
        {heroMovies.map((_, idx) => (
          <div 
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-2 rounded-full transition-all cursor-pointer ${idx === currentIndex ? 'w-8 bg-indigo-500' : 'w-2 bg-gray-400 dark:bg-white/30 hover:bg-gray-600 dark:hover:bg-white/50'}`}
          ></div>
        ))}
      </div>
      
      {/* Arrows */}
      <button onClick={prevSlide} className="absolute left-6 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/50 dark:bg-black/20 border border-gray-200 dark:border-white/10 backdrop-blur-md text-gray-900 dark:text-white transition-all hover:bg-white/80 dark:hover:bg-black/50 hover:scale-110 hidden md:flex">
        ←
      </button>
      <button onClick={nextSlide} className="absolute right-6 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/50 dark:bg-black/20 border border-gray-200 dark:border-white/10 backdrop-blur-md text-gray-900 dark:text-white transition-all hover:bg-white/80 dark:hover:bg-black/50 hover:scale-110 hidden md:flex">
        →
      </button>
      
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default HeroBanner;
