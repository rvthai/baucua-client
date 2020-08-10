import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import "./LobbyUI.css";

// Fontawesome Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-regular-svg-icons";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";

// Logo
import Logo from "assets/logo.png";

// Components
import Player from "../Player/Player";
import Settings from "./Settings/Settings";
import Tutorial from "./Tutorial/Tutorial";

function LobbyUI(props) {
  const [instructions, showInstructions] = useState(false);
  const [overlay, showOverlay] = useState(false);

  const copyToClipboard = () => {
    const el = document.createElement("textarea");
    el.value = props.room;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
  };

  const onInstructionsClick = () => {
    if (window.innerWidth < "800") {
      document.getElementById("howto").style.visibility = "hidden";
    }
    document.body.style.overflow = "hidden";
    showInstructions(true);
    showOverlay(true);
  };

  const onCancelClick = () => {
    if (window.innerWidth < "800") {
      document.getElementById("howto").style.visibility = "visible";
    }
    document.body.style.overflow = "auto";
    showInstructions(false);
    showOverlay(false);
  };

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
      <CSSTransition
        in={instructions}
        timeout={300}
        unmountOnExit
        classNames="drawer"
      >
        <Tutorial onCloseClick={onCancelClick} />
      </CSSTransition>
      <div className="nav">
        <div className="mini-logo-wrapper">
          <Link to="/">
            <img src={Logo} className="mini-logo" />
          </Link>
        </div>
        <p id="howto" className="how-to-play" onClick={onInstructionsClick}>
          HOW TO PLAY
        </p>
        {/* 
        <FontAwesomeIcon
          className="help-btn"
          icon={faQuestionCircle}
          size="3x"
        /> */}
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
          <div className="players">
            {props.players.map((player, index) => (
              <Player key={index} player={player} host={props.host} />
            ))}
          </div>
          {button}
        </div>
      </div>
    </div>
  );
}

export default LobbyUI;
