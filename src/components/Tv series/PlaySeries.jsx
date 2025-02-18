import { useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import DropdownnMenu from "../other/DropdownnMenu";
// import "./PlaySeries.css";

const PlaySeries = () => {
  const { id } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [selectedSeason, setSelectedSeason] = useState(
    searchParams.get("season_number") || "1"
  );
  const [selectedEpisode, setSelectedEpisode] = useState(
    searchParams.get("episode_number") || "1"
  );
  const [setServer] = useState("server1");
  useEffect(() => {
    const state = location.state;
    if (state) {
      setSelectedSeason(state.seasonNumber);
      setSelectedEpisode(state.episodeNumber);
    }
  }, [location.state]);
  const handleServerChange = (newServer) => {
    setServer(newServer);
  };
  return (
    <div className="play-series-page  w-[120vh] bg-neutral-800 mt-7">
      {/* <h1 className="text-4xl">{title}</h1> */}

      {selectedSeason && selectedEpisode && (
        <iframe
          className="w-full h-[70vh]  rounded-xl border-white sticky"
          src={`https://embed.su/embed/tv/${id}/${selectedSeason}/${selectedEpisode}`}
          allowFullScreen
          title="Series Player"
        ></iframe>
      )}
      <DropdownnMenu
        type="tv"
        id={id}
        seasonNumber={selectedSeason}
        episodeNumber={selectedEpisode}
        onChange={handleServerChange}
      />
    </div>
  );
};

export default PlaySeries;
