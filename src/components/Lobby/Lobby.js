import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import "./Lobby.css";

// Components
import Player from "../Player/Player";
import Settings from "./Settings/Settings";
import Tutorial from "./Tutorial/Tutorial";

// Fontawesome Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-regular-svg-icons";

// Logo
import Logo from "assets/logo.png";

function Lobby(props) {
  const [tutorial, showTutorial] = useState(false);

  const copyToClipboard = () => {
    const el = document.createElement("textarea");
    el.value = props.room;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
  };

  const onHowToPlayClick = () => {
    if (window.innerWidth < "800") {
      document.getElementById("howtoplay").style.visibility = "hidden";
    }

    document.body.style.overflow = "hidden";
    showTutorial(true);
  };

  const onCancelClick = () => {
    if (window.innerWidth < "800") {
      document.getElementById("howtoplay").style.visibility = "visible";
    }

    document.body.style.overflow = "auto";
    showTutorial(false);
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
        in={tutorial}
        timeout={300}
        unmountOnExit
        classNames="drawer"
      >
        <Tutorial onCloseClick={onCancelClick} />
      </CSSTransition>
      <div className="nav">
        <div className="mini-logo-wrapper">
          <img src={Logo} className="mini-logo" onClick={props.onLogoClick} />
        </div>
        <p id="howtoplay" className="how-to-play" onClick={onHowToPlayClick}>
          HOW TO PLAY
        </p>
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

export default Lobby;
