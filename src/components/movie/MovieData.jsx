import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation } from "swiper/modules";
function MovieData() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [trending, setTrending] = useState([]);
  // const [upcomingMovies, setUpcomingMovies] = useState([]);
  // const [nowPlayingMovies, setNowPlayingMovies] = useState([]);

  useEffect(() => {
    const fetchAndShowMovies = async () => {
      const API_KEY = import.meta.env.VITE_API_KEY;
      // console.log(API_KEY);

      const BASE_URL = import.meta.env.VITE_BASE_URL;
      const popularResponse = await fetch(
        `${BASE_URL}/movie/popular?language=en-US&page=1&${API_KEY}`
      );
      const popularData = await popularResponse.json();
      setPopularMovies(popularData.results);

      const topRatedResponse = await fetch(
        `${BASE_URL}/movie/top_rated?language=en-US&page=1&${API_KEY}`
      );
      const topRatedData = await topRatedResponse.json();
      setTopRatedMovies(topRatedData.results);

      const trendingResponse = await fetch(
        `${BASE_URL}/trending/movie/day?language=en-US&${API_KEY}`
      );
      const trendingData = await trendingResponse.json();
      setTrending(trendingData.results);
      // /trending/all/{time_window}
      // const upcomingResponse = await fetch(
      //   `${BASE_URL}/movie/upcoming?language=en-US&page=1&${API_KEY}`
      // );
      // const upcomingData = await upcomingResponse.json();
      // setUpcomingMovies(upcomingData.results);

      // const nowPlayingResponse = await fetch(
      //   `${BASE_URL}/movie/now_playing?language=en-US&page=1&${API_KEY}`
      // );
      // const nowPlayingData = await nowPlayingResponse.json();
      // setNowPlayingMovies(nowPlayingData.results);
    };

    fetchAndShowMovies();
  }, []);
  return (
    <div className="text-sm ml-10 font-[newFont]">
      {/* <h1>Now Playing Movies</h1>
      <div className="movie-list flex overflow-x-hidden z-10 scroll-smooth">
        <Swiper className="mySwiper " slidesPerView={4}>
          {nowPlayingMovies.map((movie) => (
            <SwiperSlide key={movie.id}>
              <MovieCard movie={movie} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div> */}

      <h1>Trending Movies</h1>
      <div className="movie-list flex overflow-x-hidden gap-5">
        <Swiper
          className="mySwiper"
          slidesPerView={6}
          navigation={true}
          modules={[Navigation]}
        >
          {trending.map((movie) => (
            <SwiperSlide key={movie.id}>
              <MovieCard movie={movie} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <h1>Popular Movies</h1>
      <div className="movie-list flex overflow-x-hidden">
        <Swiper
          className="mySwiper"
          slidesPerView={6}
          navigation={true}
          modules={[Navigation]}
        >
          {popularMovies.map((movie) => (
            <SwiperSlide key={movie.id}>
              <MovieCard movie={movie} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <h1>Top Rated Movies</h1>
      <div className="movie-list flex overflow-x-hidden">
        <Swiper
          className="mySwiper"
          slidesPerView={6}
          navigation={true}
          modules={[Navigation]}
        >
          {topRatedMovies.map((movie) => (
            <SwiperSlide key={movie.id}>
              <MovieCard movie={movie} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* <h1>Upcoming Movies</h1>
      <div className="movie-list flex overflow-x-hidden">
        <Swiper className="mySwiper" slidesPerView={6}>
          {upcomingMovies.map((movie) => (
            <SwiperSlide key={movie.id}>
              <MovieCard movie={movie} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div> */}
    </div>
  );
}

export default MovieData;
