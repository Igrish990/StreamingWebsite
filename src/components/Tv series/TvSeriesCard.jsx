import PropTypes from "prop-types";
import FloatingCard from "../other/FloatingCard"; // Adjust the path as necessary
import { useState, useRef } from "react";
// import genresData from "../../assets/TVGenres.json";

const TvSeriesCard = ({ series }) => {
  const { name, poster_path, vote_average, id } = series;
  const IMG_URL = import.meta.env.VITE_IMG_URL;
  const [showFloatingCard, setShowFloatingCard] = useState(false);
  const hoverTimeout = useRef(null);

  const handleMouseEnter = () => {
    hoverTimeout.current = setTimeout(() => {
      setShowFloatingCard(true);
    }, 250);
  };

  const handleMouseLeave = () => {
    clearTimeout(hoverTimeout.current);
    setShowFloatingCard(false);
  };
  return (
    <div className="tv-series-card section w-[15rem] p-2 rounded-2xl m-2  ">
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
              : "http://via.placeholder.com/1080x1580"
          }
          alt={name}
          onClick={() => (window.location.href = `/tv/${id}`)}
        />
        {showFloatingCard && (
          <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center opacity-100 transition-opacity duration-300 rounded-xl">
            <FloatingCard series={series} />
          </div>
        )}
        <h2 className="absolute top-2 right-2 bg-cyan-200 text-black rounded-full px-2 py-1">
          ⭐{vote_average.toFixed(1)}
        </h2>
        <div className="movie-info">
          <h3 className="text-xl flex items-center justify-center">{name}</h3>
        </div>
      </div>
    </div>
  );
};

TvSeriesCard.propTypes = {
  series: PropTypes.object.isRequired,
};

export default TvSeriesCard;
