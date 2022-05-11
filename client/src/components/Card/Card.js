import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./Card.css";

function Card({ id, name, flagImg, continent, continentColor, order }) {
  const navigate = useNavigate();
  const goDetail = useCallback(
    () => navigate("/country/" + id),
    [navigate, id]
  );
  return (
    <div className="outter_shell">
      <div
        className="card_shell"
        style={{
          borderTop: `5px solid ${continentColor}`,
          animationDelay: `${order / 25}s`,
        }}
        onClick={() => goDetail()}
      >
        <h1 className="card_title">{name}</h1>
        <h4 className="card_subtitle" style={{ color: continentColor }}>
          {continent}
        </h4>
        <div className="card_flag">
          <img src={flagImg} alt={`${name}'s flag`} />
        </div>
      </div>
    </div>
  );
}

export default Card;
