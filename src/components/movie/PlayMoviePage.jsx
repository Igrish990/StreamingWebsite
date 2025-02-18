import { useParams } from "react-router-dom";
import { useState } from "react";
import DropdownnMenu from "../other/DropdownnMenu";
const PlayMoviePage = () => {
  const { id } = useParams();
  const [setServer] = useState("server1");

  const handleServerChange = (newServer) => {
    setServer(newServer);
  };

  return (
    <div className="play-movie-page w-[120vh] ">
      <iframe
        className="w-full h-[70vh]  rounded-xl border-white sticky"
        src={`https://embed.su/embed/movie/${id}`}
        allowFullScreen
        title="Movie Player"
      ></iframe>

      <DropdownnMenu type="movie" id={id} onChange={handleServerChange} />
    </div>
  );
};

export default PlayMoviePage;
