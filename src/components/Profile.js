import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { Paper } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "1rem",
  },
  paper: {
    width: "100%",
    padding: ".8rem",
    "& span, i": {
      display: "block",
    },
    "& span": {
      color: "#1976d2",
      marginBottom: "0.4rem",
    },
    "& i": {
      marginBottom: "1rem",
      color: "#424242",
    },
  },
}));

function Profile() {
  const [mongoUser, setMongoUser] = useState({});
  const { user } = useAuth0();
  const {
    name,
    nickname = "anonymous",
    email,
    locale,
    email_verified,
  } = user || {};

  const classes = useStyles();

  useEffect(() => {
    axios
      .get(`/api/user/${email}`)
      .then(function (response) {
        setMongoUser(response);
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [email]);

  return user ? (
    <Grid xs={12} container item className={classes.root} sm={6} lg={3}>
      <Paper className={classes.paper} elevation={9}>
        <span>
          Name: <i>{name}</i>
        </span>
        <span>
          Nickname: <i>{nickname}</i>
        </span>
        <span>
          Email: <i>{email}</i>
        </span>
        <span>
          Locale: <i>{locale}</i>
        </span>
        <span>
          Email Verified: <i>{email_verified ? "Yes" : "No"}</i>
        </span>
      </Paper>
    </Grid>
  ) : null;
}

export default Profile;
