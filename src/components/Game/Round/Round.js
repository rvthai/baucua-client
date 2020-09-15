import React from "react";
import "./Round.css";

// Components
import Results from "./Results/Results";
import Gameover from "./Gameover/Gameover";

function Round(props) {
  return (
    <div className="round">
      {props.start !== undefined ? (
        <p className="round-banner">ROUND {props.round}</p>
      ) : null}

      {props.end !== undefined ? <Results gamestate={props.gamestate} /> : null}

      {props.gameover !== undefined ? (
        <Gameover isHost={props.isHost} gamestate={props.gamestate} />
      ) : null}
    </div>
  );
}

export default Round;
