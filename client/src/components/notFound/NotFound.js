import React from "react";
import { useHistory } from "react-router-dom";
import "./NotFound.css";
import redPill from "../../assets/red_pill.png";
import bluePill from "../../assets/blue_pill.png";

function NotFound() {
  const history = useHistory();

  const routeChange = () => {
    let path = "/Home";
    history.push(path);
  };

  return (
    <div className="error-container">
      <div className="title-holder">
        <div className="main-title">
          <div className="cut-text">lost in the matrix</div>
          <div className="error-title">
            <h2>404</h2>
          </div>
        </div>
      </div>
      <div className="btn-holder">
        <div className="red-pill-holder">
          <img className="red-pill-image" src={redPill} alt="red-pill" />
        </div>
        <div className="blue-pill-holder">
          <img className="blue-pill-image" src={bluePill} alt="blue-pill" />
          <button className="back-home-btn" onClick={routeChange}>
            HOME
          </button>
        </div>
      </div>
    </div>
  );
}
export default NotFound;
