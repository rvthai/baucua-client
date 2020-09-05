import React, { useContext } from "react";
import SocketContext from "contexts/socket-context";
import "./Players.css";

// Fontawesome Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faUserCheck,
  faCrown,
} from "@fortawesome/free-solid-svg-icons";

function Players(props) {
  const socket = useContext(SocketContext);

  return (
    <div className="game-players-container">
      <div className="players-container">
        {props.gamestate.players.map((player, index) => (
          <div key={index} className="game-player-card">
            <p className="player-rank">#{player.rank}</p>
            <div className="player-stats">
              <p className="player-stat-name">
                {player.name}{" "}
                <span style={{ fontWeight: "normal" }}>
                  {player.id === socket.id ? "(You)" : null}
                </span>
              </p>
              <p className="player-stat-balance">${player.total}</p>
            </div>
            <div className="player-icon">
              <div>
                {player.id === props.host ? (
                  <FontAwesomeIcon className="player-crown" icon={faCrown} />
                ) : null}
              </div>
              {/* {player.ready ? (
                <FontAwesomeIcon
                  icon={faUserCheck}
                  size="2x"
                  style={{
                    color: `${player.color}`,
                  }}
                />
              ) : ( */}
              <FontAwesomeIcon
                icon={faUser}
                size="2x"
                style={{
                  color: `${player.color}`,
                }}
              />
              {/* )} */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Players;
