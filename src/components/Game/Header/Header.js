import React from "react";
import "./Header.css";

// Components
import Dice from "components/Game/Header/Dice/Dice";

function Header(props) {
  return (
    <div>
      <div className="header-container">
        <div className="header-round">ROUND {props.round}</div>
        <div className="mobile-header-time">Time: {props.timer}s</div>
        <div className="header-dice">
          <Dice />
        </div>
        <div className="header-time">{props.timer}</div>
      </div>
    </div>
  );
}

export default Header;
