// import SearchBox from "./SearchBox";
import { Link } from "react-router-dom";

const HomeNavBar = () => {
  return (
    <nav className="navbar">
       <Link to="/">Home</Link>
       {/* <Link to="/">Home</Link> */}
      {/* <SearchBox /> */}
    </nav>
  );
};

export default HomeNavBar;
