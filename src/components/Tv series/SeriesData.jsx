import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import TvSeriesCard from "./TvSeriesCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
const SeriesData = () => {
  const [popularSeries, setPopularSeries] = useState([]);
  const [topRatedSeries, setTopRatedSeries] = useState([]);
  const [trending, setTrending] = useState([]);
  // const [upcomingSeries, setUpcomingSeries] = useState([]);
  // const [nowPlayingSeries, setNowPlayingSeries] = useState([]);

  useEffect(() => {
    const fetchAndShowSeries = async () => {
      const API_KEY = import.meta.env.VITE_API_KEY;
      const BASE_URL = import.meta.env.VITE_BASE_URL;
      const popularResponse = await fetch(
        `${BASE_URL}/tv/popular?language=en-US&page=1&${API_KEY}`
      );
      const popularData = await popularResponse.json();
      setPopularSeries(popularData.results);

      const topRatedResponse = await fetch(
        `${BASE_URL}/tv/top_rated?language=en-US&page=1&${API_KEY}`
      );
      const topRatedData = await topRatedResponse.json();
      setTopRatedSeries(topRatedData.results);

      const trendingResponse = await fetch(
        `${BASE_URL}/trending/tv/day?language=en-US&${API_KEY}`
      );
      const trendingData = await trendingResponse.json();
      setTrending(trendingData.results);
      // const upcomingResponse = await fetch(
      //   `${BASE_URL}/tv/airing_today?language=en-US&page=1&${API_KEY}`
      // );
      // const upcomingData = await upcomingResponse.json();
      // setUpcomingSeries(upcomingData.results);

      // const nowPlayingResponse = await fetch(
      //   `${BASE_URL}/tv/on_the_air?language=en-US&page=1&${API_KEY}`
      // );
      // const nowPlayingData = await nowPlayingResponse.json();
      // setNowPlayingSeries(nowPlayingData.results);
    };

    fetchAndShowSeries();
  }, []);
  return (
    <div className="text-sm ml-10 font-[newFont]">
      {/* <h1>Now Playing Series</h1>
      <div className="series-list flex overflow-x-hidden">
        <Swiper className="mySwiper" slidesPerView={6}>
          {nowPlayingSeries.map((series) => (
            <SwiperSlide key={series.id}>
              <TvSeriesCard series={series} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div> */}
      <h1>Trending Series</h1>
      <div className="series-list flex overflow-x-hidden">
        <Swiper
          className="mySwiper"
          slidesPerView={6}
          navigation={true}
          modules={[Navigation]}
        >
          {trending.map((series) => (
            <SwiperSlide key={series.id}>
              <TvSeriesCard series={series} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <h1>Popular Series</h1>
      <div className="series-list flex overflow-x-hidden">
        <Swiper
          className="mySwiper"
          slidesPerView={6}
          navigation={true}
          modules={[Navigation]}
        >
          {popularSeries.map((series) => (
            <SwiperSlide key={series.id}>
              <TvSeriesCard series={series} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <h1>Top Rated Series</h1>
      <div className="series-list flex overflow-x-hidden">
        <Swiper
          className="mySwiper"
          slidesPerView={6}
          navigation={true}
          modules={[Navigation]}
        >
          {topRatedSeries.map((series) => (
            <SwiperSlide key={series.id}>
              <TvSeriesCard series={series} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* <h1>Upcoming Series</h1>
      <div className="series-list flex overflow-x-hidden">
        <Swiper className="mySwiper" slidesPerView={6}>
          {upcomingSeries.map((series) => (
            <SwiperSlide key={series.id}>
              <TvSeriesCard series={series} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div> */}
    </div>
  );
};

export default SeriesData;
