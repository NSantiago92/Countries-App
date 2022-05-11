import React, { useEffect } from "react";
import "./PopUpModal.css";

function PopUpModal({ children, onStart, onKill }) {
  useEffect(() => {
    onStart && onStart();
    return onKill && onKill();
  }, [onStart, onKill]);
  return (
    <div className="popup">
      <div className="popup_content">{children}</div>
    </div>
  );
}

export default PopUpModal;
