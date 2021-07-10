import React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";

export default function SimpleMenu({ logout }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <MenuIcon
        aria-haspopup="true"
        onClick={handleClick}
        className="bgMenu"
      ></MenuIcon>
      <Menu
        id="simple-menu"
        className="menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Link to="/">
          <MenuItem onClick={handleClose}>Home</MenuItem>
        </Link>
        <Link to="profile">
          <MenuItem onClick={handleClose}>Profile</MenuItem>
        </Link>
        <MenuItem onClick={handleClose}>Dashboard</MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            logout({ returnTo: window.location.origin });
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
}
