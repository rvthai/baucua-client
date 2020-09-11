import React from "react";
import "./Results.css";

function Results(props) {
  return (
    <div className="results-container">
      <p className="results-title">Results</p>
      <div className="results">
        {props.gamestate.players.map((player, index) => (
          <div key={index} className="results-stats">
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

export default Results;
