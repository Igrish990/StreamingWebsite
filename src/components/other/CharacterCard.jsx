import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { FreeMode, Mousewheel } from "swiper/modules";

const CharacterCard = ({ type }) => {
  const { id } = useParams();
  const API_KEY = import.meta.env.VITE_API_KEY;
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const IMG_URL = import.meta.env.VITE_IMG_URL;
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    const fetchCharacterDetail = async () => {
      const response = await fetch(
        `${BASE_URL}/${type}/${id}/credits?${API_KEY}`
      );
      const data = await response.json();
      setCharacters(data.cast);
      // console.log(data.cast);
    };

    fetchCharacterDetail();
  }, [id, type]);

  return (
    <div className="character-card-container section h-[50vh] overflow-y-hidden  ">
      <Swiper
        className="mySwiper"
        slidesPerView={3.5}
        direction={"vertical"}
        freeMode={true}
        mousewheel={true}
        modules={[Mousewheel, FreeMode]}
      >
        {characters.map((character) => (
          <SwiperSlide key={character.cast_id}>
            <div
              className="character-info flex mt-4 bg-gray-600 p-1 rounded-xl "
              onClick={() => (window.location.href = `/search-character`)}
            >
              <div className=" h-[13%] w-[13%] rounded-xl   overflow-hidden ">
                <img
                  src={
                    character.profile_path
                      ? `${IMG_URL}${character.profile_path}`
                      : "https://static.vecteezy.com/system/resources/previews/009/734/564/original/default-avatar-profile-icon-of-social-media-user-vector.jpg"
                  }
                  alt={character.name}
                  className="character-image object-cover  "
                />
              </div>
              <div className="character-details ml-3 mt-3 p-2 font-bold section ">
                <h3 className="font-bold text-base flex justify-start">
                  {character.character}
                </h3>
                <p className="flex text-sm justify-start">
                  {" "}
                  {character.original_name}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

CharacterCard.propTypes = {
  type: PropTypes.oneOf(["movie", "tv"]).isRequired,
};

export default CharacterCard;
