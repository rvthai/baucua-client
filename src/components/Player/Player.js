import React, { Component } from "react";

// Fontawesome Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCrown } from "@fortawesome/free-solid-svg-icons";

import "./Player.css";

class Player extends Component {
  render() {
    var host_icon;
    if (this.props.player.id === this.props.host) {
      host_icon = <FontAwesomeIcon className="host-icon" icon={faCrown} />;
    } else {
      host_icon = (
        <FontAwesomeIcon
          className="host-icon"
          icon={faCrown}
          style={{ opacity: 0 }}
        />
      );
    }

    return (
      <div className="player">
        <div>{host_icon}</div>
        <FontAwesomeIcon
          icon={faUser}
          size="5x"
          style={{
            color: `${this.props.player.color}`,
          }}
        />
        <p>{this.props.player.name}</p>
      </div>
    );
  }
}

export default Player;
