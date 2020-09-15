import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import "./Lobby.css";

// Components
import Player from "./Player/Player";
import Settings from "./Settings/Settings";
import Help from "./Help/Help";

// Fontawesome Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-regular-svg-icons";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";

// Logo
import Logo from "assets/logo/logo.png";

function Lobby(props) {
  const [help, showHelp] = useState(false);

  const copyToClipboard = () => {
    const code = document.createElement("textarea");
    code.value = props.room;
    document.body.appendChild(code);
    code.select();
    document.execCommand("copy");
    document.body.removeChild(code);

    var snackbar = document.getElementById("snackbar");
    snackbar.className = "show";
    setTimeout(() => {
      snackbar.className = snackbar.className.replace("show", "");
    }, 3000);
  };

  const onHowToPlayClick = () => {
    if (help === true) {
      showHelp(false);
    } else {
      showHelp(true);
    }
  };

  const onCancelClick = () => {
    showHelp(false);
  };

  // Set specific views for the host
  var button;
  var lobby_message;
  if (props.isHost) {
    button = (
      <button className="start-btn" onClick={props.onClickStart}>
        Start Game
      </button>
    );
    lobby_message = "Invite your friends by sharing the room code above!";
  } else {
    lobby_message = "Waiting for the host to start the game...";
  }

  return (
    <div className="lobby-page-container">
      <CSSTransition in={help} timeout={100} unmountOnExit classNames="dialog">
        <Help onCloseClick={onCancelClick} />
      </CSSTransition>

      <div className="mini-logo-wrapper">
        <img
          src={Logo}
          alt="logo"
          className="mini-logo"
          onClick={props.onLogoClick}
        />
      </div>

      <div className="lobby-container">
        <p className="room-code">
          Room Code:
          <span className="room-code-code">{props.room}</span>
          <FontAwesomeIcon
            className="copy-btn"
            icon={faCopy}
            onClick={copyToClipboard}
          />
        </p>
        <Settings
          players={props.players}
          isHost={props.isHost}
          timer={props.timer}
          round={props.round}
          balance={props.balance}
          onSettingsChange={props.onSettingsChange}
        />
        <div className="lobby">
          <p className="lobby-title">Lobby ({props.players.length}/8)</p>
          <p className="lobby-message">{lobby_message}</p>
          <div className="lobby-players">
            {props.players.map((player, index) => (
              <Player key={index} player={player} host={props.host} />
            ))}
          </div>
          {button}
        </div>
      </div>

      <div id="snackbar">Copied to clipboard!</div>
      <div className="help-btn-wrapper">
        <FontAwesomeIcon
          id="help-btn"
          icon={faQuestionCircle}
          size="3x"
          onClick={onHowToPlayClick}
        />
      </div>
    </div>
  );
}

export default Lobby;
