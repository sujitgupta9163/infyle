import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Play, Plus, Check, Share2, ThumbsUp, ChevronDown, X } from "lucide-react";
import { useMyList } from "../context/MyListContext";
import { useSeries } from "../context/SeriesContext";

const SeriesDetails = () => {
  const { id } = useParams();
  const { series: allSeries } = useSeries();
  const series = allSeries.find((s) => s.id === parseInt(id)) || allSeries[0];
  const { addToMyList, removeFromMyList, isInMyList } = useMyList();
  
  const inList = isInMyList(series.id);
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleMyListClick = () => {
    if (inList) {
      removeFromMyList(series.id);
    } else {
      addToMyList(series);
    }
  };

  // Generate mock episodes based on selected season
  const mockEpisodes = Array.from({ length: 8 }).map((_, i) => ({
    id: `${selectedSeason}-${i + 1}`,
    number: i + 1,
    title: `Episode ${i + 1}`,
    duration: `${Math.floor(Math.random() * 15) + 40}m`,
    description: "An exciting continuation of the story where our heroes face new challenges and shocking revelations unfold.",
    image: `https://images.unsplash.com/photo-${1500000000000 + i * 10000}?auto=format&fit=crop&w=300&q=80` // Mock stable-ish image by using a random but static query, actually let's just use the series image for mock
  }));

  return (
    <div className="py-6">
      <Link to="/series" className="inline-flex items-center text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Series
      </Link>

      <div className="relative w-full overflow-hidden rounded-3xl bg-gray-900 shadow-2xl mb-12">
        {/* Backdrop Image */}
        <div className="absolute inset-0 aspect-video md:aspect-[21/9]">
          <img 
            src={series.image} 
            alt={series.title} 
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
              src={series.image} 
              alt={series.title} 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details */}
          <div className="flex-1 flex flex-col justify-center text-center md:text-left z-10">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-4">
              <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-indigo-400 bg-indigo-400/10 border border-indigo-400/20 rounded-full">TV Series</span>
              <span className="text-gray-300 text-sm font-medium">{series.seasons} Seasons</span>
              <span className="w-1.5 h-1.5 rounded-full bg-gray-500"></span>
              <span className="text-gray-300 text-sm font-medium">{series.episodes} Episodes</span>
              <span className="w-1.5 h-1.5 rounded-full bg-gray-500"></span>
              <span className="px-2 py-0.5 text-xs font-bold text-gray-300 border border-gray-500 rounded bg-gray-800/50">4K</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 tracking-tight drop-shadow-lg">
              {series.title}
            </h1>
            
            <p className="text-xl font-medium text-indigo-400 mb-6 drop-shadow">
              {series.genre}
            </p>

            <p className="text-gray-300 leading-relaxed max-w-3xl mb-8 text-lg">
              {series.description || "Dive into this critically acclaimed series. Binge all episodes now and experience the thrilling journey that everyone is talking about."}
            </p>

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
              <button 
                onClick={() => setIsPlaying(true)}
                className="flex items-center gap-2 px-8 py-4 bg-white text-black rounded-full font-bold hover:bg-indigo-500 hover:text-white transition-colors shadow-lg hover:shadow-indigo-500/50"
              >
                <Play className="h-5 w-5 fill-current" />
                Play S1:E1
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

      {/* Episodes Section */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Episodes</h2>
          
          {/* Season Selector */}
          <div className="relative">
            <select 
              value={selectedSeason}
              onChange={(e) => setSelectedSeason(Number(e.target.value))}
              className="appearance-none bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white py-2 pl-4 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium cursor-pointer"
            >
              {Array.from({ length: series.seasons }).map((_, i) => (
                <option key={i + 1} value={i + 1}>Season {i + 1}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
          </div>
        </div>

        <div className="space-y-4">
          {mockEpisodes.map((ep) => (
            <div 
              key={ep.id} 
              onClick={() => setIsPlaying(true)}
              className="group flex flex-col sm:flex-row gap-4 p-4 rounded-xl bg-white dark:bg-[#131620] border border-gray-100 dark:border-gray-800/60 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all cursor-pointer shadow-sm hover:shadow-md"
            >
              <div className="relative shrink-0 w-full sm:w-48 aspect-video rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-800">
                <img src={series.image} alt={ep.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="h-10 w-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/40 flex items-center justify-center text-white">
                    <Play className="h-4 w-4 fill-current ml-0.5" />
                  </div>
                </div>
              </div>
              
              <div className="flex-1 py-1">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {ep.number}. {ep.title}
                  </h3>
                  <span className="text-sm font-medium text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                    {ep.duration}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 md:line-clamp-3">
                  {ep.description}
                </p>
              </div>
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

export default SeriesDetails;
