import React from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";

import { useAuth0 } from "@auth0/auth0-react";

import Menu from "../Menu";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    "& div": {
      justifyContent: "flex-end",
      "& a": {
        color: "#52525B",
      },
      "& button": {
        fontSize: "1rem",
        fontWeight: "bold",
      },
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  logo: {
    flexGrow: "1",
    fontFamily: "cursive",
    color: "#404040",
  },
}));

export default function Navbar() {
  const { user, loginWithRedirect, logout, isAuthenticated, isLoading } =
    useAuth0();

  console.log(user);

  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.root}>
      <Toolbar>
        <h1 className={classes.logo}>GoPeer</h1>
        {isLoading ? null : isAuthenticated ? (
          <>
            <img
              src={user.picture}
              style={{ width: "40px", borderRadius: "2rem" }}
              alt="account img"
            ></img>
            <Menu logout={logout} />
          </>
        ) : (
          <>
            <Button onClick={loginWithRedirect} color="inherit">
              Login
            </Button>
            <Button
              onClick={() =>
                loginWithRedirect({
                  screen_hint: "signup",
                })
              }
              color="inherit"
            >
              Register
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
