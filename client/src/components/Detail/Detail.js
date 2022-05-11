import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCountryDetail, resetCountryDetail } from "../../redux/actions";
import "./Detail.css";
import numberWithDots from "../../utils/numberWithDots";
import ActivityListItem from "../ActivityListItem/ActivityListItem";

function Detail() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const {
    continentColor,
    name,
    code,
    flagImg,
    continent,
    capital,
    subRegion,
    area,
    population,
    activities,
  } = useSelector((state) => state.countryDetail);

  useEffect(() => {
    dispatch(getCountryDetail(id));
  }, [dispatch, id]);

  useEffect(() => {
    return () => dispatch(resetCountryDetail());
  }, [dispatch]);

  return (
    <div className="detail_page">
      <div
        className="detail_shell"
        style={{
          borderTop: `6px solid ${continentColor}`,
        }}
      >
        <Link to="/home">{"<Back"}</Link>
        <div className="flag_shell">
          <img src={flagImg} alt={name + " flag"} />
          <h1>{name}</h1> <span>{code}</span>
        </div>
        <div className="info_shell">
          <div className="region_info_shell">
            <h3
              style={{
                color: continentColor,
              }}
            >
              {continent}
            </h3>
            <p>
              <i>{subRegion}</i>
            </p>
            <p>
              <span>Capital: </span>
              {capital}
            </p>
          </div>
          <div className="stats_info_shell">
            <p>
              <span> Area: </span> {numberWithDots(area)} km&sup2;{" "}
            </p>
            <p>
              <span> Population: </span> {numberWithDots(population)}
            </p>
          </div>
        </div>
        <p style={{ textAlign: "left", color: "gray", margin: "0px" }}>
          <i>Activities:</i>
        </p>
        {activities?.map(({ id, name, difficulty, duration, season }) => (
          <ActivityListItem
            key={id}
            name={name}
            difficulty={difficulty}
            duration={duration}
            season={season}
          />
        ))}
      </div>
    </div>
  );
}

export default Detail;
