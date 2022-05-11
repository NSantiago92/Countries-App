import React, { useState } from "react";
import "./ActivityListItem.css";
import fullStar from "../../assets/fullstar_icon.png";

function ActivityListItem({ name, difficulty, duration, season }) {
  const [toogle, setToogle] = useState(false);
  return (
    <div className={toogle ? "item_shell_on" : "item_shell_off"}>
      <button className={"collapsible"} onClick={() => setToogle((t) => !t)}>
        <span style={{ float: "left", color: "gray" }}>・</span>
        {name}
        <span style={{ float: "right", color: "gray" }}>
          {toogle ? "Λ" : "V"}
        </span>
      </button>
      <div className="content">
        <p>
          <span style={{ float: "left" }}>
            {duration} {duration === 1 ? "day" : "days"} in {season}
          </span>
          <span style={{ float: "right" }}>
            {" "}
            Difficulty:{" "}
            {Array.from({ length: difficulty }, (_, i) => (
              <img src={fullStar} alt="star" key={"diff_star_" + i} />
            ))}
          </span>
        </p>
      </div>
    </div>
  );
}

export default ActivityListItem;
