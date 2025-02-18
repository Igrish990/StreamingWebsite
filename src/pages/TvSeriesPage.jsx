// import React from 'react';
import Navbar from "./Navbar";
import SeriesDetail from "../components/Tv series/SeriesDetail";
import PlaySeries from "../components/Tv series/PlaySeries";
const SeriesPage = () => {
  return (
    <div className="series-page flex w-screen text-white bg-zinc-900 h-screen ">
      <Navbar />
      <PlaySeries />
      <div id="series" className=" h-full section overflow-x-auto rounded-xl ">
        <SeriesDetail />
      </div>
    </div>
  );
};

export default SeriesPage;
