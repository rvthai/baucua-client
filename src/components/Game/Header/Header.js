import React from "react";
import "./Header.css";

// Components
import Dice from "components/Game/Header/Dice/Dice";

function Header(props) {
  return (
    <div className="header-container">
      <div className="header-round">ROUND {props.round}</div>
      <div className="header-dice">
        <Dice />
      </div>
      <div className="header-time">{props.timer}</div>
    </div>
  );
}

export default Header;
