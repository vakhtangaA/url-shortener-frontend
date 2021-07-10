import React, { useState, useEffect } from "react";
import axios from "axios";
import validator from "validator";
import { useAuth0 } from "@auth0/auth0-react";

import { TextField, Button } from "@material-ui/core";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import { InputAdornment } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import CircularProgress from "@material-ui/core/CircularProgress";

function ShortenForm() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [visible, setVisible] = useState(true);
  const [isLoading, setLoading] = useState(false);

  const { user } = useAuth0();

  useEffect(() => {
    setTimeout(() => {
      setVisible(false);
    }, 1000);
  }, [visible]);

  const handleLongUrl = (e) => {
    setLongUrl(e.target.value);
  };

  const handleCopy = async () => {
    try {
      const toCopy = shortUrl;
      await navigator.clipboard.writeText(toCopy);
      setVisible(true);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const validURL = validator.isURL(longUrl, {
      require_protocol: true,
    });

    if (!validURL) {
      alert("Please ensure this url is correct and includes http(s) protocol");
    } else {
      axios
        .post("/api/shorten", {
          url: longUrl,
          visited: 0,
        })
        .then((res) => {
          setLoading(false);
          setShortUrl(
            `https://url-shortener-gol.herokuapp.com/${res.data.hash}`
          );
        })
        .catch((err) => console.log(err));

      if (user) {
        axios
          .post("/api/create", {
            name: user.name,
            email: user.email,
            url: longUrl,
          })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  };
  return (
    <div>
      <form className="shortenForm" onSubmit={handleSubmit}>
        <TextField
          placeholder="Enter URL with http(s)"
          variant="filled"
          onChange={handleLongUrl}
          value={longUrl}
        ></TextField>
        <Button
          color="primary"
          variant="contained"
          type="submit"
          value="shorten"
          size="large"
          className="shortenButton"
        >
          Shorten
        </Button>

        {isLoading ? (
          <CircularProgress className="circularProgress" color="secondary" />
        ) : shortUrl ? (
          <>
            <TextField
              variant="outlined"
              size="small"
              className="shortUrlInput"
              value={shortUrl ? shortUrl : ""}
              InputProps={{
                endAdornment: (
                  <InputAdornment
                    position="end"
                    className="copyAdornment"
                    style={{ cursor: "pointer" }}
                    onClick={handleCopy}
                  >
                    <FileCopyIcon />
                  </InputAdornment>
                ),
              }}
            ></TextField>
            {visible ? (
              <Alert severity="info" className="copyAlert">
                link copied
              </Alert>
            ) : null}
          </>
        ) : null}
      </form>
    </div>
  );
}

export default ShortenForm;
