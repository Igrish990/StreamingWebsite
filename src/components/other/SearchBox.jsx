import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import SearchCard from "./SearchCard";
const SearchBox = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const API_KEY = import.meta.env.VITE_API_KEY;
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const handleInputChange = async (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    console.log(term);
    if (term.length > 3) {
      // Fetch results only if the search term is longer than 2 characters
      const response = await fetch(
        `${BASE_URL}/search/multi?query=${term.toLowerCase()}&${API_KEY}`
      );
      const data = await response.json();
      console.log(data);
      setSearchResults(data.results);
    } else {
      setSearchResults([]);
    }
  };
  return (
    <div className="w-[101%]  h-20  flex-column  mt-5 mb-10 sticky top-0 z-50 bg-black  ">
      {/* <div className="button flex w-1/3 bg-black backdrop-blur  rounded-full border-solid border-2 border-cyan-500"> */}
      <div className=" relative max-w-[30rem] mr-auto bg-white/[.08] rounded-[2rem] group focus-within:bg-white/15 smoothie overflow-hidden h-10 ring-[.025em] ring-white/20 ml-1 flex justify-center items-center top-5 left-1/3">
        <div className="flex items-center justify-center absolute top-1/2 -translate-y-1/2 w-14 left-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-search text-white/30"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </svg>
        </div>
        {/* className="w-full bg-black rounded-r-full " */}
        <input
          className="bg-transparent size-full p-3 pl-12  !text-sm 2xl:!text-base !text-gray-100 tracking-wider focus:outline-none"
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleInputChange}
        />
      </div>{" "}
      {searchResults.length > 0 && (
        <div className="movie-list h-[80vh]  bg-transparent  absolute top-35 left-0 right-0 z-50 mt-10  smooth-scroll">
          <Swiper
            className="mySwiper"
            slidesPerView={6}
            direction={"vertical"}
            freeMode={true}
            mousewheel={true}
            modules={[Mousewheel, FreeMode]}
          >
            {searchResults.map((multi) => (
              <SwiperSlide key={multi.id}>
                <SearchCard multi={multi} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
      {/* <div className="movie-list ">
        {searchResults.map((multi) => (
          <SearchCard key={multi.id} multi={multi} />
        ))}
      </div> */}
    </div>
  );
};

export default SearchBox;
