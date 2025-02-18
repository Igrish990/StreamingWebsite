import MovieData from "../components/movie/MovieData";
import SeriesData from "../components/Tv series/SeriesData";
import SearchBox from "../components/other/SearchBox";
// import HomeNavBar from "./HomeNavBar";
const HomePage = () => {
  return (
    <div className="home-page section w-[200vh] ">
      {/* <HomeNavBar /> */}
      <SearchBox />
      <MovieData />
      <SeriesData />
    </div>
  );
};

export default HomePage;
