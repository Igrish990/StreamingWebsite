import Navbar from "./Navbar";
import MovieDetail from "../components/movie/MovieDetail";
import PlayMoviePage from "../components/movie/PlayMoviePage";
const MoviePage = () => {
  return (
    <div className="movie-page flex w-screen text-white bg-zinc-900 h-screen  ">
      <div className="flex items-center">
        <Navbar />
      </div>
      <div className="mt-10">
        <PlayMoviePage />
      </div>
      <div
        id="movies"
        className=" overflow-x-auto h-full section  bg-neutral-900   rounded-xl "
      >
        <MovieDetail />
      </div>
    </div>
  );
};

export default MoviePage;
