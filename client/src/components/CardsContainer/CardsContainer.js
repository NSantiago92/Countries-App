import React from "react";
import Card from "../Card/Card";
import "./CardsContainer.css";

function CardsContainer({ countries }) {
  return (
    <div className="cards_container">
      {countries.length === 0 ? (
        <div>No encontre naida</div>
      ) : (
        countries.map(({ id, name, flagImg, continent, continentColor }, i) => (
          <Card
            key={id}
            id={id}
            order={i}
            name={name}
            flagImg={flagImg}
            continent={continent}
            continentColor={continentColor}
          />
        ))
      )}
    </div>
  );
}

export default CardsContainer;
