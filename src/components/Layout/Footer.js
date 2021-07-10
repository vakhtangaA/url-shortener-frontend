import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopyright } from "@fortawesome/free-solid-svg-icons";

function Footer() {
  return (
    <footer className="footer">
      <div>
        <FontAwesomeIcon icon={faCopyright} className="ftIcon" />
        <span>2021</span>
        <span>url-shortener</span>
      </div>
    </footer>
  );
}

export default Footer;
