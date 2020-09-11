import React, { useContext } from "react";
import SocketContext from "contexts/socket-context";
import "./Gameover.css";

function Gameover(props) {
  const socket = useContext(SocketContext);

  const onPlayAgainClick = () => {
    socket.emit("playagain");
  };

  return (
    <div className="gameover-container">
      <p className="gameover-title">Gameover</p>
      <div className="leaderboard">
        {props.gamestate.players.map((player, index) => (
          <div key={index} className="leaderboard-score">
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
        <button className="play-again-button" onClick={onPlayAgainClick}>
          Play Again
        </button>
      ) : (
        <p className="play-again-message">
          Waiting for host to restart game...
        </p>
      )}
    </div>
  );
}

export default Gameover;
