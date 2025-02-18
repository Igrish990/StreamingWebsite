import { useEffect, useState } from "react";
// import { useLocation, useHistory } from "react-router-dom";

const API_KEY = import.meta.env.VITE_API_KEY;
const IMG_URL = import.meta.env.VITE_IMG_URL;
const BASE_URL = import.meta.env.VITE_BASE_URL;
const SearchCharacterMovies = () => {
  const [characters, setCharacters] = useState([]);
  // const location = useLocation();
  // const history = useHistory();
  const handleCharacterClick = () => {
    const originalName = location.state?.originalName;
    // You can now use the originalName for further actions
    console.log(originalName);
  };
  useEffect(() => {
    const fetchCharacterDetail = async () => {
      const originalName = location.state?.originalName;
      if (originalName) {
        const response = await fetch(
          `${BASE_URL}/search/person?query=${originalName}&${API_KEY}`
        );
        const data = await response.json();
        setCharacters(data.results);
        history.push({
          pathname: "/search-character",
          state: { results: data.results },
        });
      }
    };

    fetchCharacterDetail();
  }, [location.state, history]);

  return (
    <div className=" bg-[#1c1c1c] w-screen h-screen">
      <h1>Search Character Movies</h1>
      <div className="character-movies bg-emerald-600 h-[15vh] w-[10vh]">
        {characters.map((character) => (
          <div
            key={character.id}
            className="character-movie"
            onClick={() => handleCharacterClick(character)}
          >
            <img
              src={
                character.profile_path
                  ? `${IMG_URL}${character.profile_path}`
                  : "https://static.vecteezy.com/system/resources/previews/009/734/564/original/default-avatar-profile-icon-of-social-media-user-vector.jpg"
              }
              alt={character.name}
            />
            <h3>{character.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchCharacterMovies;
