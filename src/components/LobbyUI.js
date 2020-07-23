import React from "react";
import DisplayPlayerName from "./Player";
import { Link } from "react-router-dom";

function LobbyUI(props){
  let button;
  if (props.host){
    button = (
        <button onClick={props.onClickStart}>Start Game</button>
    )
  }
  return(
    <div>
        <h1>Lobby</h1>
        <div>
          <h1>Room:{props.room}</h1>
          <DisplayPlayerName players={props.player}/>
        </div>
        {button}
        <Link to="/">
          <button>back</button>
        </Link>
    </div>
  )
}

export default LobbyUI;