import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
// import SearchIcon from "@mui/icons-material/Search";
import { green } from "@mui/material/colors";
const Navbar = () => {
  return (
    <div className="w-[20vh] h-[90%] bg-zinc-900 ">
      <Link to="/" className="flex items-center gap-2">
        <HomeIcon sx={{ color: green[600], fontSize: 40 }} />{" "}
        <span className="text-2xl text-white">Home</span>
      </Link>
      {/* <Link to="/">
        <SearchIcon sx={{ color: red[600] }} fontSize="large" />
        <SearchBox />
      </Link> */}
    </div>
  );
};

export default Navbar;
