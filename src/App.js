import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import validator from "validator";
import axios from "axios";

const App = () => {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const handleLongUrl = e => {
    setLongUrl(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    const validURL = validator.isURL(longUrl, {
      require_protocol: true,
    });

    if (!validURL) {
      alert("Please ensure this url is correct and includes http(s) protocol");
    } else {
      axios
        .post("https://url-shortener-gol.herokuapp.com/", {
          url: longUrl,
        })
        .then(res => {
          setShortUrl(
            `https://url-shortener-gol.herokuapp.com/${res.data.hash}`
          );
        })
        .catch(err => console.log(err));
    }
  };

  return (
    <Router>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter URL"
            onChange={handleLongUrl}
            value={longUrl}
          />
          <input type="submit" value="shorten" />
        </form>
        <a href={longUrl}>{shortUrl}</a>
      </div>
    </Router>
  );
};

export default App;
