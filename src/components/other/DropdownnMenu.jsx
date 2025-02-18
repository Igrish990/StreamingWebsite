import { useState } from "react";
// import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
// import { CheckIcon } from "radix-ui/react-icons"

// import * as React from 'react';

import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
// const options = ["server1", "server2"];

const DropdownnMenu = ({ type, id, seasonNumber, episodeNumber, onChange }) => {
  // const [selectedServer, setSelectedServer] = useState("");
  // const [color, setColor] =useState("blue");
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleServerChange = (event) => {
    const iframe = document.querySelector("iframe");
    if (iframe) {
      if (type === "movie") {
        if (event.target.value === "server1") {
          iframe.src = `https://embed.su/embed/movie/${id}`;
        } else if (event.target.value === "server2") {
          iframe.src = `https://moviesapi.club/movie/${id}`;
        }
      } else if (type === "tv") {
        if (event.target.value === "server1") {
          iframe.src = `https://embed.su/embed/tv/${id}/${seasonNumber}/${episodeNumber}`;
        } else if (event.target.value === "server2") {
          iframe.src = `https://moviesapi.club/tv/${id}-${seasonNumber}-${episodeNumber}`;
        }
      }
    }
    onChange(event.target.value);
  };

  return (
    <>
      {/* <div className="dropdown section m-5">
        <label htmlFor="server-select" className="dropdown-label">
          Change Server:
        </label>
        <select
          id="server-select"
          // value={selectedServer}
          onClick={handleServerChange}
          className="dropdown-select"
        >
          <option value="server1">Primary</option>
          <option value="server2">Secondary</option>
        </select>
      </div> */}
      <div className="dropdown section m-5  text-white bg-black">
        <Button
          variant="contained"
          color="green"
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          Change Server
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem
            onClick={() => handleServerChange({ target: { value: "server1" } })}
          >
            Primary
          </MenuItem>
          <MenuItem
            onClick={() => handleServerChange({ target: { value: "server2" } })}
          >
            Secondary
          </MenuItem>
        </Menu>
      </div>
    </>
  );
};

DropdownnMenu.propTypes = {
  type: PropTypes.oneOf(["movie", "tv"]).isRequired,
  id: PropTypes.string.isRequired,
  seasonNumber: PropTypes.string,
  episodeNumber: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default DropdownnMenu;
