import React from "react";
import "./FilterTag.css";

function FilterTag({ id, type, text, onClose }) {
  return (
    <div>
      <button className="filter_btn" onClick={() => onClose(type, id)}>
        {text} <b>X</b>
      </button>
    </div>
  );
}

export default FilterTag;
