import React from "react";
import "./Results.css";

function Results(props) {
  return (
    <div className="results-container">
      <p className="results-title">Gameover</p>
      <div className="results">
        {props.gamestate.players.map((player, index) => (
          <div key={index} className="player-score">
            {player.rank === 1 ? (
              <>
                <p className="stat gold">#{player.rank}</p>
                <p className="stat gold">{player.name}</p>
                <p className="stat gold">${player.total}</p>
              </>
            ) : player.rank === 2 ? (
              <>
                <p className="stat silver">#{player.rank}</p>
                <p className="stat silver">{player.name}</p>
                <p className="stat silver">${player.total}</p>
              </>
            ) : player.rank === 3 ? (
              <>
                <p className="stat bronze">#{player.rank}</p>
                <p className="stat bronze">{player.name}</p>
                <p className="stat bronze">${player.total}</p>
              </>
            ) : (
              <>
                <p className="stat">#{player.rank}</p>
                <p className="stat">{player.name}</p>
                <p className="stat">${player.total}</p>
              </>
            )}
          </div>
        ))}
      </div>
      {props.isHost ? (
        <button className="play-again-button" onClick={props.onPlayAgainClick}>
          Play Again
        </button>
      ) : null}
    </div>
  );
}

export default Results;
