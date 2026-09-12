import { useMyList } from "../context/MyListContext";
import MovieCard from "../components/home/MovieCard";

const MyList = () => {
  const { myList } = useMyList();

  return (
    <div className="py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">My List</h1>
        <p className="text-gray-500 dark:text-gray-400">Movies and shows you want to watch later.</p>
      </div>
      
      {myList.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {myList.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-24 h-24 mb-6 text-gray-300 dark:text-gray-700">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-2">Your list is empty</h2>
          <p className="text-gray-500 dark:text-gray-500">Add movies and shows to your list to watch them later.</p>
        </div>
      )}
    </div>
  );
};

export default MyList;
