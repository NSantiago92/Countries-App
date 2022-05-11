import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import PopUpModal from "../PopUpModal/PopUpModal";
import successImg from "../../assets/success.png";
import errorImg from "../../assets/error.png";
import "./SubmitPopUp.css";

function SubmitPopUp({ error, setSubmit }) {
  const navigate = useNavigate();
  const goHome = useCallback(() => navigate("/home"), [navigate]);

  return (
    <PopUpModal>
      <div className="popup_shell">
        <button
          onClick={() => setSubmit({ submitted: false, error: false })}
          className="exit_btn"
        >
          X
        </button>
        <h1>{error ? "Something went wrong" : "Success"}</h1>
        <img
          src={error ? errorImg : successImg}
          alt={error ? "Error" : "Success"}
          style={{ width: "100px" }}
        />
        <p>{error ? "The activity wasn't added" : "The activity was added"}</p>
        <button onClick={() => goHome()} className="home_btn">
          Home
        </button>
      </div>
    </PopUpModal>
  );
}

export default SubmitPopUp;
