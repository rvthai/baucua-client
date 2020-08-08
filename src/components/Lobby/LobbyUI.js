import React from "react";
import { Link } from "react-router-dom";
import "./LobbyUI.css";

// Fontawesome Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-regular-svg-icons";

// Logo
import Logo from "assets/logo.png";

// Components
import Player from "../Player/Player";

function LobbyUI(props) {
  function copyToClipboard() {
    // alert("Room code copied!");
    const el = document.createElement("textarea");
    el.value = props.room;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
  }

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

  if (props.players.length > 1 && !props.isHost){
    if (document.getElementById("timer") && document.getElementById("round")){
      document.getElementById("timer").classList.add("no-touch");
    document.getElementById("round").classList.add("no-touch");
    }
  }

  return (
    <div className="lobby-container">
      <Link to="/">
        <img src={Logo} className="mini-logo" />
      </Link>
      <p className="room-code">
        Room Code:
        <span className="room-code-code">{props.room}</span>
        <FontAwesomeIcon
          className="copy-btn"
          icon={faCopy}
          onClick={copyToClipboard}
        />
      </p>
      <div className="lobby-options">
        <p>Time</p>
          <select id="timer"  onChange={props.timerChange} value={props.timer}>
            <option value={30}>30s</option>
            <option value={60}>60s</option>
            <option value={90}>90s</option>
          </select>
          <p>Rounds</p>
          <select id="round" onChange={props.amountChange} value={props.round}>
            <option value={5}>5</option>
            <option value={7}>7</option>
            <option value={10}>10</option>
          </select>
      </div> 
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
  );
}

export default LobbyUI;
