import React, { useContext } from "react";
import SocketContext from "contexts/socket-context";
import "./Players.css";

// Fontawesome Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCheck } from "@fortawesome/free-solid-svg-icons";

function Players(props) {
  const socket = useContext(SocketContext);

  return (
    <div className="players-container">
      {props.gamestate.players.map((player, index) => (
        <div key={index} className="player-card">
          <p className="player-rank">#{player.rank}</p>
          <div className="player-stats">
            <p className="player-stat-name">
              {player.name}{" "}
              <span style={{ fontWeight: "normal" }}>
                {player.id === socket.id ? "(You)" : null}
              </span>
            </p>
            {player.bankrupt ? (
              <p className="player-stat-bankrupt">BANKRUPT</p>
            ) : (
              <p className="player-stat-balance">${player.total}</p>
            )}
          </div>

          <div className="player-icon">
            <FontAwesomeIcon
              icon={faUser}
              size="2x"
              style={{
                color: player.color,
              }}
            />
            {player.betClicked && player.ready && !player.bankrupt ? (
              <FontAwesomeIcon icon={faCheck} className="check" />
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Players;
