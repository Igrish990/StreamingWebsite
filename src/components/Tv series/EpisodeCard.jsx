import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
const IMG_URL = import.meta.env.VITE_IMG_URL;

const EpisodeCard = ({ episode, seriesId, seasonNumber }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/tv/${seriesId}`, {
      state: {
        id: seriesId,
        seasonNumber,
        episodeNumber: episode.episode_number,
      },
    });
  };
  return (
    <div className="episode-card flex w-full " onClick={handleClick}>
      <div className="flex w-full rounded-xl">
        <div className="relative h-[8vh] w-[20vh] m-1">
          <p className="absolute top-0 left-0 bg-black bg-opacity-50 text-white p-1 rounded">
            Ep: {episode.episode_number}
          </p>
          <img
            src={
              episode.still_path
                ? `${IMG_URL}${episode.still_path}`
                : "http://via.placeholder.com/1080x1580"
            }
            alt={episode.name}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        <div className="episode-details flex-inline justify-start  text-xs w-[100%]">
          <h3 className="flex ml-2 justify-start mt-5 items-center text-base">{episode.name}</h3>
          {/* <p className=" text-xs mt-2">
            {episode.overview}
            {episode.overview.length > 115
              ? `${episode.overview.slice(0, 115)}...`
              : episode.overview}
          </p> */}
        </div>
      </div>
    </div>
  );
};
EpisodeCard.propTypes = {
  episode: PropTypes.shape({
    name: PropTypes.string.isRequired,
    overview: PropTypes.string.isRequired,
    episode_number: PropTypes.number.isRequired,
    still_path: PropTypes.string,
  }).isRequired,
  seriesId: PropTypes.number.isRequired,
  seasonNumber: PropTypes.number.isRequired,
};
// };
export default EpisodeCard;
