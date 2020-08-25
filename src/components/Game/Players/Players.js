import React from "react";

import "./Players.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

function Players(props) {
  return (
    <div className="game-players-container">
      <div className="players-container">
        {props.gamestate.players.map((player, index) => (
          <div key={index + "game-card"} className="game-player-card">
            <div className="game-player-icon">
              <FontAwesomeIcon
                icon={faUser}
                size="3x"
                style={{
                  color: `${player.color}`,
                }}
              />
              <p>{player.name}</p>
            </div>
            <div key={index + "total"} className="game-player-total">
              <p>Balance</p>
              {player.total > 0 ? (
                <p style={{ color: "green" }}>${player.total}</p>
              ) : player.total === 0 ? (
                <p style={{ color: "yellow" }}>${player.total}</p>
              ) : (
                <p style={{ color: "red" }}>${player.total}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Players;
