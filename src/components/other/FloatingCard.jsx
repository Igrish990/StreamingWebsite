import PropTypes from "prop-types";
import { useState, useEffect, useRef } from "react";
const FloatingCard = ({ movie, series }) => {
  const IMG_URL = import.meta.env.VITE_IMG_URL;
  const [position, setPosition] = useState("left-[80%]");
  const cardRef = useRef(null);
  const handleClick = () => {
    if (movie && movie.id) {
      window.location.href = `/movie/${movie.id}`;
    } else if (series && series.id) {
      window.location.href = `/tv/${series.id}`;
    }
  };
  useEffect(() => {
    const handlePosition = () => {
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        if (rect.left < window.innerWidth / 2) {
          setPosition("left-[80%]");
        } else {
          setPosition("right-[80%]");
        }
      }
    };
    handlePosition();
    window.addEventListener("resize", handlePosition);
    return () => window.removeEventListener("resize", handlePosition);
  }, []);

  const vote_average = movie
    ? movie.vote_average.toFixed(1)
    : series
    ? series.vote_average.toFixed(1)
    : "N/A";

  return (
    <div
      ref={cardRef}
      className={`absolute top-[3rem] ${position} w-[40vh] p-2 h-[25vh]duration-30  text-white rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10  bg-zinc-700 `}
      onClick={handleClick}
      style={{ cursor: "pointer" }}
    >
      <div className="floating-card-image relative h-[17vh] w-full rounded-lg overflow-hidden ">
        <img
          className="w-full rounded-lg h-15"
          src={
            movie && movie.backdrop_path
              ? IMG_URL + movie.backdrop_path
              : series && series.backdrop_path
              ? IMG_URL + series.backdrop_path
              : "http://via.placeholder.com/1080x1580"
          }
          alt={movie ? movie.title : series ? series.title : "Placeholder"}
        />
        <h2 className="absolute top-2 right-2 bg-cyan-200 text-black rounded-full px-2 py-1">
          ⭐{vote_average}
        </h2>
      </div>
      <div className="flex-inline justify-start">
        <h4 className="text-base mt-2 flex justify-start">
          {movie ? movie.title : series ? series.name : "Title"}
        </h4>
        <p className="text-xs  w-[100%]   leading-4">
          {movie
            ? movie.overview.length > 150
              ? `${movie.overview.slice(0, 150)}...`
              : movie.overview
            : series
            ? series.overview.length > 150
              ? `${series.overview.slice(0, 150)}...`
              : series.overview
            : "Overview"}
        </p>
        <p className="text-xs mt-1 flex justify-start">
          {movie
            ? `Release Date: ${movie.release_date}`
            : series
            ? `First Air Date: ${series.first_air_date}`
            : "Date"}
        </p>

        <p className="text-xs mt-1 flex justify-start">
          {movie ? "Type: Movie" : series ? "Type: Series" : "Type"}
        </p>
        <p className="text-xs mt-1 flex justify-start">
          {movie
            ? `Language: ${movie.original_language}`
            : series
            ? `Language: ${series.original_language}`
            : "Language"}
        </p>
      </div>

      {/* <p className="text-sm h-[15vh] justify-start text-left overflow-hidden">
        {movie ? movie.overview : series ? series.overview : "Overview"}
      </p> */}
      <button
        className="mt-2 px-4 py-2 bg-white text-black rounded-full hover:bg-gray-500 transition-colors duration-300"
        onClick={handleClick}
      >
        Watch Now
      </button>
    </div>
  );
};

FloatingCard.propTypes = {
  movie: PropTypes.object,
  series: PropTypes.object,
};

export default FloatingCard;
