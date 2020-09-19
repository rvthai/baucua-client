import React from "react";
import "./Player.css";

// Fontawesome Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCrown } from "@fortawesome/free-solid-svg-icons";

function Player(props) {
  // Add a crown icon to the host
  var host_icon;
  if (props.player.id === props.host) {
    host_icon = <FontAwesomeIcon className="crown-icon" icon={faCrown} />;
  } else {
    host_icon = (
      <FontAwesomeIcon
        className="crown-icon-ghost"
        icon={faCrown}
        style={{ opacity: 0 }}
      />
    );
  }

  return (
    <div className="player">
      <div>
        <div>{host_icon}</div>
        <FontAwesomeIcon
          id="player-icon"
          icon={faUser}
          size="5x"
          style={{
            color: props.player.color,
          }}
        />
      </div>
      <p className="player-name">{props.player.name}</p>
    </div>
  );
}

export default Player;
