import React, { useContext } from "react";
import SocketContext from "contexts/socket-context";
import "./RoundModal.css";

// Components
import Scoreboard from "./Scoreboard/Scoreboard";
import Results from "./Scoreboard/Results";

function RoundModal(props) {
  const socket = useContext(SocketContext);

  const returnToLobby = () => {
    socket.emit("return");
  };

  return (
    <div className="round-modal">
      {props.start !== undefined ? <p>ROUND {props.round}</p> : null}
      {props.end !== undefined ? (
        <Scoreboard gamestate={props.gamestate} />
      ) : null}
      {props.gameover !== undefined ? (
        <Results
          isHost={props.isHost}
          gamestate={props.gamestate}
          onPlayAgainClick={returnToLobby}
        />
      ) : null}
    </div>
  );
}

export default RoundModal;
