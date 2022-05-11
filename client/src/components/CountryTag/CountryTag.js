import React from "react";
import "./CountryTag.css";

function CountryTag({ code, flagImg, killTag, id }) {
  return (
    <div className="country_tag">
      <div className="flag_thumb_shell">
        <img className="flag_thumb" src={flagImg} alt="flag-thumb" />
      </div>
      <div className="text_shell" onClick={(e) => killTag(id)}>
        {code}
        <b className="close_btn"> X</b>
      </div>
    </div>
  );
}

export default CountryTag;
