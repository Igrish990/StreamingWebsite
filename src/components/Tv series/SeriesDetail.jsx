import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CharacterCard from "../other/CharacterCard";
import EpisodeDetails from "./EpisodeDetails";
const SeriesDetail = () => {
  const { id } = useParams();
  const [series, setSeries] = useState(null);
  // const navigate = useNavigate();
  const API_KEY = import.meta.env.VITE_API_KEY;
  const IMG_URL = import.meta.env.VITE_IMG_URL;
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const fetchSeriesDetail = async () => {
      const response = await fetch(`${BASE_URL}/tv/${id}?${API_KEY}`);
      const data = await response.json();
      setSeries(data);
      console.log(data);
    };

    fetchSeriesDetail();
  }, [id]);
  // const genreNames =
  //   series?.genres?.map((genre) => genre.name).join(", ") || "Unknown";
  if (!series) return <div>Loading...</div>;
  // console.log(series.number_of_seasons);
  // console.log(series.number_of_episodes);
  return (
    <div className="series-card-page w-[60vh] h-full section m-5 bg-transparent rounded-xl p-2">
      <h1 className="text-xl">{series.name}</h1>

      <div className="h-[50vh] w-full mb-10">
        <EpisodeDetails />
      </div>
      <hr />
      <div className="series-card-container flex rounded-lg mt-5">
        <div className="series-card-image flex-initial w-[30vh] h-[30vh] relative m-2">
          <img
            className="w-full h-full rounded-lg  object-cover"
            id="poster"
            src={
              series.poster_path
                ? IMG_URL + series.poster_path
                : "http://via.placeholder.com/1080x1580"
            }
            alt={series.title}
          />
          <h2 className="absolute top-2 right-2 text-xs bg-cyan-200 text-black rounded-full px-2 py-1">
            ⭐{series.vote_average.toFixed(1)}
          </h2>
        </div>

        <div className="detail font-[Newfont] w-full text-base">
          <h3 className="text-gray-500 text-base">
            Status <br />{" "}
            <span className="text-sm text-white"> {series.status}</span>{" "}
          </h3>
          <h1 className="text-gray-500 text-base">
            Production <br />{" "}
            <span className="text-sm text-white flex gap-0 leading-2">
              {series.production_companies
                .map((company) => company.name)
                .join(", ")}
            </span>
          </h1>{" "}
          <h3 className="text-gray-500 text-base">
            Air Date:{" "}
            <span className="text-sm text-white">
              {" "}
              {series.first_air_date} to {series.last_air_date}
            </span>{" "}
          </h3>
          <h3 className="text-gray-500 text-base">
            Rating:
            <span className="text-sm text-white">
              {" "}
              {series.vote_average}
            </span>{" "}
          </h3>
          <h3 className="text-gray-500 text-base">
            Number of Seasons:{" "}
            <span className="text-sm text-white">
              {series.number_of_seasons}
            </span>{" "}
          </h3>{" "}
          <h3 className="text-gray-500 text-base">
            Number of Episodes:{" "}
            <span className="text-sm text-white">
              {series.number_of_episodes}
            </span>{" "}
          </h3>
        </div>
      </div>
      <div className="series-details flex-initial w-[100%] font-[Newfont]">
        <h1 className="text-xl ">Overview</h1>
        <div className="w-full max-h-[15vh] ">
          <p className="text-xs  w-[100%] flex justify-start  leading-4">
            {series.overview}
            {/*             
            {series.overview.length > 100
              ? `${series.overview.slice(0, 200)}...`
              : series.overview} */}
          </p>
        </div>

        {/* <h3 className="text-sm h-[5%] w-full">{series.overview}</h3> */}
        {/* <p className="text-lg">{genreNames}</p> */}
        <div className="genres flex gap-2 mt-4">
          {series.genres?.map((genre) => (
            <span key={genre.id} className="bg-gray-500 text-white p-1 rounded">
              {genre.name}
            </span>
          )) || "Unknown"}
        </div>

        <CharacterCard type="tv" />
        {/* <button onClick={() => navigate(`/tv/${id}`)}>Play Series</button> */}
      </div>
    </div>
  );
};

export default SeriesDetail;
