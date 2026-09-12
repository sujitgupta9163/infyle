import { createContext, useState, useContext, useEffect } from "react";

const MyListContext = createContext();

export const useMyList = () => {
  return useContext(MyListContext);
};

export const MyListProvider = ({ children }) => {
  // Try to load from localStorage first
  const [myList, setMyList] = useState(() => {
    const savedList = localStorage.getItem("infyleott_mylist");
    return savedList ? JSON.parse(savedList) : [];
  });

  // Save to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("infyleott_mylist", JSON.stringify(myList));
  }, [myList]);

  const addToMyList = (movie) => {
    setMyList((prev) => {
      // Prevent duplicates
      if (prev.find((m) => m.id === movie.id)) return prev;
      return [...prev, movie];
    });
  };

  const removeFromMyList = (movieId) => {
    setMyList((prev) => prev.filter((m) => m.id !== movieId));
  };

  const isInMyList = (movieId) => {
    return myList.some((m) => m.id === movieId);
  };

  return (
    <MyListContext.Provider value={{ myList, addToMyList, removeFromMyList, isInMyList }}>
      {children}
    </MyListContext.Provider>
  );
};
