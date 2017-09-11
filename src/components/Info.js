import React from "react";
import "./Info.css";

import githubLogo from "../assets/GitHub_Logo.png";

export default () => (
  <div className="info">
    <a
      className="info--github-link"
      href="https://github.com/G2Jose/wheres-my-ttc"
    >
      <img
        className="info--github-logo"
        src={githubLogo}
        alt="link to project on github"
      />
    </a>
  </div>
);
