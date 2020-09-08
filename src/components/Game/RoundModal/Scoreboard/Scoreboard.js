import React from "react";
import "./Scoreboard.css";

function Scoreboard(props) {
  return (
    <div className="scoreboard-container">
      <p className="scoreboard-title">Results</p>
      <div className="scoreboard">
        {props.gamestate.players.map((player, index) => (
          <div key={index} className="player-score">
            <p className="stat">{player.name}</p>
            {player.net > 0 ? (
              <p className="stat" style={{ color: "#7FFF00" }}>
                + ${player.net}
              </p>
            ) : player.net < 0 ? (
              <p className="stat" style={{ color: "#DC143C" }}>
                - ${player.net * -1}
              </p>
            ) : (
              <p className="stat">{player.net}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Scoreboard;
