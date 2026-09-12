import { createContext, useState, useContext, useEffect } from "react";
import { trendingSeries as initialSeries } from "../data/series";

const SeriesContext = createContext();

export const useSeries = () => {
  return useContext(SeriesContext);
};

export const SeriesProvider = ({ children }) => {
  const [series, setSeries] = useState(() => {
    const saved = localStorage.getItem("infyle_series_v2");
    if (saved) {
      return JSON.parse(saved);
    }
    return initialSeries;
  });

  useEffect(() => {
    localStorage.setItem("infyle_series_v2", JSON.stringify(series));
  }, [series]);

  const addSeries = (newSeries) => {
    const item = {
      ...newSeries,
      id: Date.now(),
    };
    setSeries((prev) => [item, ...prev]);
  };

  const removeSeries = (id) => {
    setSeries((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <SeriesContext.Provider value={{ series, addSeries, removeSeries }}>
      {children}
    </SeriesContext.Provider>
  );
};
