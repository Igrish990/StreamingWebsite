import React, { useState, useEffect } from "react";
import {
  fetcher,
  TMDB_ENDPOINT,
  getSeasonDetails,
  getMovieDetails,
  getTVDetails,
  getRecommendations,
} from "../utils/tmdbapi";
import MovieLayout from "./watch/MovieLayout";
import SeriesLayout from "./watch/SeriesLayout";
import Player from "./player/VideoPlayer";

const WatchView = ({ movie, onBack }) => {
  const [details, setDetails] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [selectedEp, setSelectedEp] = useState(1);
  const [currentEpisode, setCurrentEpisode] = useState(null);

  useEffect(() => {
    const fetchFullDetails = async () => {
      try {
        const type = movie.title ? "movie" : "tv";
        const detailsData =
          type === "movie"
            ? await getMovieDetails(movie.id)
            : await getTVDetails(movie.id);

        const recData = await getRecommendations(type, movie.id);

        setDetails(detailsData);
        setRecommendations(recData.results.slice(0, 12));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching details:", error);
      }
    };
    fetchFullDetails();
    window.scrollTo(0, 0);
  }, [movie]);

  useEffect(() => {
    const fetchSeason = async () => {
      if (details && !details.title) {
        try {
          const seasonData = await getSeasonDetails(details.id, selectedSeason);
          setEpisodes(seasonData.episodes || []);
          // Only reset episode to 1 if the current selectedEp isn't in the new episodes list
          // or if it's a fresh season change.
          // Actually, usually when you change season you want episode 1.
          setSelectedEp(1);
        } catch (error) {
          console.error("Error fetching season details:", error);
        }
      }
    };
    fetchSeason();
  }, [selectedSeason, details]);

  useEffect(() => {
    if (episodes.length > 0) {
      setCurrentEpisode(
        episodes.find((e) => e.episode_number === selectedEp) || episodes[0],
      );
    }
  }, [selectedEp, episodes]);

  if (loading || !details) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const isMovie = !!details.title;

  return (
    <div className="min-h-screen bg-zinc-950 pt-20 pb-20">
      <div className="max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Simple Breadcrumb */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors text-sm font-bold"
          >
            ← Back to Home
          </button>

          {!isMovie && (
            <div className="text-zinc-400 text-sm font-black uppercase tracking-widest">
              S{selectedSeason} - E{selectedEp}{" "}
              <span className="text-white ml-2">{currentEpisode?.name}</span>
            </div>
          )}
        </div>

        {isMovie ? (
          <MovieLayout details={details} recommendations={recommendations} />
        ) : (
          <SeriesLayout
            details={details}
            recommendations={recommendations}
            episodes={episodes}
            selectedSeason={selectedSeason}
            onSelectSeason={setSelectedSeason}
            selectedEp={selectedEp}
            onSelectEp={setSelectedEp}
            currentEpisode={currentEpisode}
          />
        )}
      </div>
    </div>
  );
};

export default WatchView;
