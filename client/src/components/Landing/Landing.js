import React from "react";
import { Link } from "react-router-dom";
import earthBg from "../../assets/earth_bg.png";
import "./Landing.css";

function Landing() {
  return (
    <div className="landing" style={{ backgroundColor: "#4e5c8b" }}>
      <img src={earthBg} alt="earth bg" />
      <Link to="/home">
        <h1>Enter</h1>
      </Link>
    </div>
  );
}

export default Landing;
