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

      {props.end !== undefined ? (
        <Results results={props.results} gamestate={props.gamestate} />
      ) : null}

      {props.gameover !== undefined ? (
        <Gameover
          results={props.results}
          isHost={props.isHost}
          gamestate={props.gamestate}
        />
      ) : null}

      {props.timesup !== undefined ? (
        <div className="times-up-banner">
          <p className="times-up">TIMES UP!</p>
          <p className="rolling">Rolling...</p>
        </div>
      ) : null}

      {props.rolling !== undefined ? (
        <div className="times-up-banner">
          <p className="times-up">ALL BETS IN!</p>
          <p className="rolling">Rolling...</p>
        </div>
      ) : null}
    </div>
  );
}

export default Round;
