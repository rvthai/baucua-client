import React from "react";
import "./Header.css";

// Components
import Die from "components/Game/Die/Die";

// Fontawesome Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStopwatch } from "@fortawesome/free-solid-svg-icons";

function Header(props) {
  return (
    <div className="main-header-container">
      <div className="game-time">ROUND {props.round}</div>
      <div className="game-dice">
        <Die gamestate={props.gamestate} />
      </div>
      <div className="game-time">
        <div className="base-timer">{props.timer}</div>
      </div>
    </div>
  );
}

export default Header;
