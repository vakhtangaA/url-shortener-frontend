import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { Paper, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import LinkIcon from "@material-ui/icons/Link";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "1rem",
  },
  paper: {
    width: "100%",
    padding: ".8rem",
    marginBottom: "2rem",
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
    "& .totalUrl": {
      display: "flex",
      "& > div": {
        flexGrow: "1",
      },
      "& .totalImageIcon": {
        alignSelf: "center",
        color: "grey",
        rotate: "-45deg",
      },
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
      .then((res) => {
        setMongoUser(res);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("/api/urls/")
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [email]);

  return user ? (
    <Grid xs={12} container item className={classes.root} spacing={2}>
      <Grid item xs={12} sm={6}>
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
      <Grid item xs={12} sm={6} container alignItems="center">
        <Paper className={classes.paper} elevation={9}>
          <div className="totalUrl">
            <div>
              <span>
                TOTAL URLS:
                <i>{mongoUser.data ? mongoUser.data.urls.length : 0}</i>
              </span>
              <Link to="dashboard">Go to dashboard</Link>
            </div>
            <LinkIcon fontSize="large" className="totalImageIcon" />
          </div>
        </Paper>
        <Paper className={classes.paper} elevation={9}>
          <div className="totalUrl">
            <div>
              <span>
                URLS ADDED THIS MONTH:
                <i>{mongoUser.data ? mongoUser.data.urls.length : 0}</i>
              </span>
              <Link to="dashboard">Go to dashboard</Link>
            </div>
            <LinkIcon fontSize="large" className="totalImageIcon" />
          </div>
        </Paper>
      </Grid>
    </Grid>
  ) : null;
}

export default Profile;
