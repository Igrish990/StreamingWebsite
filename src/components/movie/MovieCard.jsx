import PropTypes from "prop-types";
import { useState, useRef } from "react";
import FloatingCard from "../other/FloatingCard";

const MovieCard = ({ movie }) => {
  const { title, poster_path, vote_average, id } = movie;
  const IMG_URL = import.meta.env.VITE_IMG_URL ;
  const [showFloatingCard, setShowFloatingCard] = useState(false);
  const hoverTimeout = useRef(null);

  const handleMouseEnter = () => {
    hoverTimeout.current = setTimeout(() => {
      setShowFloatingCard(true);
    }, 500);
  };

  const handleMouseLeave = () => {
    clearTimeout(hoverTimeout.current);
    setShowFloatingCard(false);
  };
  return (
    <div
      className="movie-card section w-[15rem] p-2 rounded-2xl m-2 "
    >
      <div
        className="relative group rounded-lg"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <img
          className="w-full rounded-xl"
          src={
            poster_path
              ? IMG_URL + poster_path
              : "https://static.vecteezy.com/system/resources/previews/009/734/564/original/default-avatar-profile-icon-of-social-media-user-vector.jpg"
          }
          alt={title}
          onClick={() => (window.location.href = `/movie/${id}`)}
        />
        {showFloatingCard && (
          <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center opacity-100 transition-opacity duration-300 rounded-xl">
            <FloatingCard movie={movie} />
          </div>
        )}
        <h2 className="absolute top-2 right-2 bg-cyan-200 text-black rounded-full px-2 py-1">
          ⭐{vote_average.toFixed(1)}
        </h2>
        <div className="movie-info">
          <h3 className="text-xl flex items-center justify-center">{title}</h3>
        </div>
      </div>
    </div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    poster_path: PropTypes.string,
    genre_ids: PropTypes.arrayOf(PropTypes.number).isRequired,
    overview: PropTypes.string.isRequired,
    vote_average: PropTypes.number.isRequired,
    backdrop_path: PropTypes.string,
    id: PropTypes.number.isRequired,
  }).isRequired,
};

export default MovieCard;

