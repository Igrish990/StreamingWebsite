import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import EpisodeCard from "./EpisodeCard";
import "swiper/css";
import { FreeMode, Mousewheel } from "swiper/modules";

const EpisodeDetails = () => {
  const { id } = useParams();
  const [episode, setEpisode] = useState(null);
  const [seasonNumber, setSeasonNumber] = useState(1); // default season number
  const [seasons, setSeasons] = useState([]);
  const API_KEY = import.meta.env.VITE_API_KEY;
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  useEffect(() => {
    const fetchSeasons = async () => {
      const response = await fetch(`${BASE_URL}/tv/${id}?${API_KEY}`);
      const data = await response.json();
      setSeasons(data.seasons);
    };

    fetchSeasons();
  }, [id]);

  useEffect(() => {
    const fetchEpisodeDetail = async () => {
      const response = await fetch(
        `${BASE_URL}/tv/${id}/season/${seasonNumber}?${API_KEY}`
      );
      const data = await response.json();
      setEpisode(data);
      console.log(data);
    };

    fetchEpisodeDetail();
  }, [id, seasonNumber]);
  const handleSeasonChange = (event) => {
    setSeasonNumber(event.target.value);
  };
  return (
    <div className="episode-details h-[40vh] font-[Newfont] w-full my-0">
      <div className="season-selector mb-5">
        <label htmlFor="season-select" className="mr-2">
          Select Season:
        </label>
        <select
          id="season-select"
          value={seasonNumber}
          onChange={handleSeasonChange}
          className="p-2 bg-gray-700 text-white rounded"
        >
          {seasons.map((season) => (
            <option key={season.season_number} value={season.season_number}>
              {season.name}
            </option>
          ))}
        </select>
      </div>
      {episode && (
        <Swiper
          slidesPerView={4}
          direction={"vertical"}
          freeMode={true}
          mousewheel={true}
          modules={[Mousewheel, FreeMode]}
        >
          {episode.episodes.map((episode) => (
            <SwiperSlide key={episode.id}>
              <EpisodeCard
                episode={episode}
                seriesId={id}
                seasonNumber={seasonNumber}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default EpisodeDetails;
