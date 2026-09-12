import HeroBanner from "../components/home/HeroBanner";
import ContinueWatching from "../components/home/ContinueWatching";
import TrendingMovies from "../components/home/TrendingMovies";
import TrendingSeries from "../components/home/TrendingSeries";

import { continueWatching } from "../data/movies";
import { useMovies } from "../context/MoviesContext";
import { useSeries } from "../context/SeriesContext";

const Home = () => {
  const { movies } = useMovies();
  const { series } = useSeries();

  return (
    <>
      <HeroBanner />
      <ContinueWatching movies={continueWatching} />
      <TrendingMovies movies={movies} />
      <TrendingSeries series={series} />
    </>
  );
};

export default Home;
