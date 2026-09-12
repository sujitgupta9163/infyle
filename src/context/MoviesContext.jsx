import { createContext, useState, useContext, useEffect } from "react";
import { trendingMovies as initialMovies } from "../data/movies";

const MoviesContext = createContext();

export const useMovies = () => {
  return useContext(MoviesContext);
};

export const MoviesProvider = ({ children }) => {
  const [movies, setMovies] = useState(() => {
    const saved = localStorage.getItem("infyle_movies_v2");
    if (saved) {
      return JSON.parse(saved);
    }
    return initialMovies;
  });

  useEffect(() => {
    localStorage.setItem("infyle_movies_v2", JSON.stringify(movies));
  }, [movies]);

  const addMovie = (movie) => {
    const newMovie = {
      ...movie,
      id: Date.now(), // Generate a unique ID
    };
    setMovies((prev) => [newMovie, ...prev]);
  };

  const removeMovie = (id) => {
    setMovies((prev) => prev.filter((movie) => movie.id !== id));
  };

  return (
    <MoviesContext.Provider value={{ movies, addMovie, removeMovie }}>
      {children}
    </MoviesContext.Provider>
  );
};
