import PropTypes from "prop-types";
const SearchCard = ({ multi }) => {
  const {
    title,
    name,
    poster_path,
    first_air_date,
    vote_average,
    id,
    media_type,
    release_date,
  } = multi;
  const IMG_URL = import.meta.env.VITE_IMG_URL;
  return (
    <div className=" relative w-full h-full top-10 bg-black/80 opacity-100 z-50 flex justify-center overflow-hidden">
      <div className="flex w-[30%] justify-start  bg-white/[.08]  group focus-within:bg-white/15 smoothie overflow-hidden h-30 ring-[.025em] ring-white/20 font-[Newfont]  ">
        <div className=" h-[10vh] w-[8vh] rounded-xl   overflow-hidden m-2">
          <img
            src={
              poster_path
                ? IMG_URL + poster_path
                : "http://via.placeholder.com/1080x1580"
            }
            alt={title || name || "Title"}
            onClick={() => (window.location.href = `/${media_type}/${id}`)}
            className="character-image object-cover "
          />
        </div>
        <div
          className="movie-info w-full   mt-5"
          onClick={() => (window.location.href = `/${media_type}/${id}`)}
        >
          <h3 className="text-sm flex items-center justify-start ">
            {title || name || "Title"}
          </h3>
          <div className="flex justify-start items-start">
            <h2 className=" text-sm text-white rounded-full ">
              ⭐{vote_average}
            </h2>
            <h1 className="text-sm  ml-4"> {media_type.toUpperCase()}</h1>
            <h1 className="text-sm  ml-4">
              {" "}
              {first_air_date || release_date || "Released On"}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};
SearchCard.propTypes = {
  multi: PropTypes.shape({
    title: PropTypes.string.isRequired,
    name: PropTypes.string,
    poster_path: PropTypes.string,
    vote_average: PropTypes.number,
    id: PropTypes.number.isRequired,
    first_air_date: PropTypes.string,
    release_date: PropTypes.string,
    media_type: PropTypes.string,
  }).isRequired,
};

export default SearchCard;
