import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CharacterCard from "../other/CharacterCard";
const MovieCardPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const API_KEY = import.meta.env.VITE_API_KEY;
  const IMG_URL = import.meta.env.VITE_IMG_URL;
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const fetchMovieDetail = async () => {
      const response = await fetch(`${BASE_URL}/movie/${id}?${API_KEY}`);
      const data = await response.json();
      setMovie(data);
    };

    fetchMovieDetail();
  }, [id]);
  if (!movie) return <div>Loading...</div>;

  return (
    <div className="movie-card-page w-[60vh] section m-5 bg-transparent rounded-xl">
      <h1 className="text-xl ml-5">{movie.title}</h1>
      <div className="movie-card-container flex rounded-lg">
        <div className="series-card-image flex-initial w-[30vh] h-[30vh] relative m-2">
          <img
            className="w-full h-full rounded-lg object-cover"
            id="poster"
            src={
              movie.poster_path
                ? IMG_URL + movie.poster_path
                : "http://via.placeholder.com/1080x1580"
            }
            alt={movie.title}
          />
          <h2 className="absolute top-2 right-2 text-xs bg-cyan-200 text-black rounded-full px-2 py-1">
            ⭐{movie.vote_average.toFixed(1)}
          </h2>
        </div>
        <div className="w-full font-[Newfont] text-sm">
          <h3 className="text-gray-500 text-base">
            Status <br />{" "}
            <span className="text-sm text-white"> {movie.status}</span>{" "}
          </h3>
          <h1 className="text-gray-500 text-base">
            Production <br />{" "}
            <span className="text-sm text-white flex gap-0 leading-2">
              {movie.production_companies
                .map((company) => company.name)
                .join(", ")}
            </span>
          </h1>{" "}
          <h1 className="text-gray-500 text-base">
            Aired <br />{" "}
            <span className="text-sm text-white"> {movie.release_date}</span>
          </h1>
          <h3 className="text-gray-500 text-base">Runtime: {movie.runtime} minutes</h3>
        </div>
      </div>

      <div className="movie-details flex-initial w-full font-[Newfont]">
        <h1 className="text-xl">Overview</h1>
        <p className="text-xs w-[100%] flex justify-start leading-4">
          {movie.overview}
        </p>
        <div className="genres flex gap-3 mt-4">
          {movie.genres?.map((genre) => (
            <span
              key={genre.id}
              className="bg-gray-500 text-white px-2 py-1 rounded"
            >
              {genre.name}
            </span>
          )) || "Unknown"}
        </div>
        <CharacterCard type="movie" />
      </div>
    </div>
  );
};

export default MovieCardPage;
