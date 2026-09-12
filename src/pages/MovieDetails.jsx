import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Play, Plus, Check, Share2, ThumbsUp, X } from "lucide-react";
import { useMyList } from "../context/MyListContext";
import { useMovies } from "../context/MoviesContext";

const MovieDetails = () => {
  const { id } = useParams();
  const { movies } = useMovies();
  const movie = movies.find((m) => m.id === parseInt(id)) || movies[0];
  const { addToMyList, removeFromMyList, isInMyList } = useMyList();
  
  const [isPlaying, setIsPlaying] = useState(false);
  const inList = isInMyList(movie.id);

  const handleMyListClick = () => {
    if (inList) {
      removeFromMyList(movie.id);
    } else {
      addToMyList(movie);
    }
  };

  return (
    <div className="py-6 relative">
      <Link to="/" className="inline-flex items-center text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Home
      </Link>

      <div className="relative w-full overflow-hidden rounded-3xl bg-gray-900 shadow-2xl">
        {/* Backdrop Image */}
        <div className="absolute inset-0 aspect-video md:aspect-[21/9]">
          <img 
            src={movie.image} 
            alt={movie.title} 
            onError={(e) => { e.target.onerror = null; e.target.src = "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=600&auto=format&fit=crop"; }}
            className="w-full h-full object-cover opacity-40 blur-sm scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/80 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative flex flex-col md:flex-row gap-8 px-6 py-12 md:p-12 lg:p-16">
          {/* Poster */}
          <div className="shrink-0 mx-auto md:mx-0 w-48 md:w-64 overflow-hidden rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.5)] border border-white/10 z-10">
            <img 
              src={movie.image} 
              alt={movie.title} 
              onError={(e) => { e.target.onerror = null; e.target.src = "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=1200&auto=format&fit=crop"; }}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details */}
          <div className="flex-1 flex flex-col justify-center text-center md:text-left z-10">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-4">
              <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-green-400 bg-green-400/10 border border-green-400/20 rounded-full">New Release</span>
              <span className="text-gray-300 text-sm font-medium">2026</span>
              <span className="w-1.5 h-1.5 rounded-full bg-gray-500"></span>
              <span className="text-gray-300 text-sm font-medium">2h 15m</span>
              <span className="w-1.5 h-1.5 rounded-full bg-gray-500"></span>
              <span className="px-2 py-0.5 text-xs font-bold text-gray-300 border border-gray-500 rounded bg-gray-800/50">4K</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 tracking-tight drop-shadow-lg">
              {movie.title}
            </h1>
            
            <p className="text-xl font-medium text-indigo-400 mb-6 drop-shadow">
              {movie.genre}
            </p>

            <p className="text-gray-300 leading-relaxed max-w-3xl mb-8 text-lg">
              {movie.description || "In a future where humanity is fighting for survival, an unlikely hero emerges to lead the resistance. Action-packed and visually stunning, this epic adventure will keep you on the edge of your seat from start to finish."}
            </p>

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
              <button 
                onClick={() => setIsPlaying(true)}
                className="flex items-center gap-2 px-8 py-4 bg-white text-black rounded-full font-bold hover:bg-indigo-500 hover:text-white transition-colors shadow-lg hover:shadow-indigo-500/50"
              >
                <Play className="h-5 w-5 fill-current" />
                Play Movie
              </button>
              
              <button 
                onClick={handleMyListClick}
                className={`flex h-14 w-14 items-center justify-center rounded-full border transition-all backdrop-blur-sm ${
                  inList 
                    ? 'bg-indigo-500 border-indigo-500 text-white hover:bg-red-500 hover:border-red-500' 
                    : 'bg-gray-800/60 border-gray-600/50 text-white hover:bg-white hover:text-black hover:border-white'
                }`}
                title={inList ? "Remove from My List" : "Add to My List"}
              >
                {inList ? <Check className="h-6 w-6" /> : <Plus className="h-6 w-6" />}
              </button>
              
              <button className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-800/60 border border-gray-600/50 text-white hover:bg-white hover:text-black transition-all backdrop-blur-sm">
                <ThumbsUp className="h-5 w-5" />
              </button>
              
              <button className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-800/60 border border-gray-600/50 text-white hover:bg-white hover:text-black transition-all backdrop-blur-sm">
                <Share2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Cast Section Mock */}
      <div className="mt-12">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Top Cast</h3>
        <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
          {[1,2,3,4,5,6].map(i => (
            <div key={i} className="flex-none w-28 text-center">
              <div className="w-28 h-28 rounded-full bg-gray-300 dark:bg-gray-800 mb-3 overflow-hidden shadow-md">
                 <img src={`https://i.pravatar.cc/150?img=${i+10}`} alt="Actor" className="w-full h-full object-cover" />
              </div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">Actor Name</p>
              <p className="text-xs text-gray-500">Character</p>
            </div>
          ))}
        </div>
      </div>

      {/* Video Player Overlay */}
      {isPlaying && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md">
          <button 
            onClick={() => setIsPlaying(false)}
            className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
          
          <div className="w-full max-w-6xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl relative">
            <video 
              controls 
              autoPlay 
              className="w-full h-full object-contain"
              src="https://www.w3schools.com/html/mov_bbb.mp4"
            >
              Your browser does not support HTML video.
            </video>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
