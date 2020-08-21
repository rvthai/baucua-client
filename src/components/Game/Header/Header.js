import React from "react";
import "./Header.css";

function Header(props) {
  return (
    <div className="main-header-container">
      <div id="game-time" className="game-time">
        <p>{props.timer}</p>
      </div>
      <div className="game-dice">
        <div id="dice1" className="game-die">
          {props.gamestate.dice.length > 0 ? props.gamestate.dice[0] : null}
        </div>
        <div id="dice2" className="game-die">
          {props.gamestate.dice.length > 0 ? props.gamestate.dice[1] : null}
        </div>
        <div id="dice3" className="game-die">
          {props.gamestate.dice.length > 0 ? props.gamestate.dice[2] : null}
        </div>
      </div>
    </div>
  );
}

export default Header;
