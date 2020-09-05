import React from "react";
import "./RoundModal.css";

// Components
import Scoreboard from "./Scoreboard/Scoreboard";

function RoundModal(props) {
  return (
    <div className="round-modal">
      {props.start !== undefined ? <p>ROUND {props.round}</p> : null}
      {props.end !== undefined ? (
        <Scoreboard gamestate={props.gamestate} />
      ) : null}
      {props.gameover !== undefined ? (
        <div className="gameover-modal">
          <p>GAMEOVER</p>
          <button onClick={props.return}>MAIN MENU</button>
        </div>
      ) : null}
    </div>
  );
}

export default RoundModal;
