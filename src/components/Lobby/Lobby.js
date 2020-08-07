import React, { useState, useEffect, useRef } from "react";
import { Redirect } from "react-router-dom";
import io from "socket.io-client";

// Components
import LobbyUI from "./LobbyUI";
import Game from "../Game/Game";

let socket;

function Lobby(props) {
  // State
  const [renderView, setRender] = useState(0);

  const [newRoom] = useState(props.location.state.newRoom);
  const [room] = useState(props.match.params.roomId);

  const [host, setHost] = useState("");
  const [isHost, setIsHost] = useState(false);

  const [players, setPlayers] = useState([]);
  const [player, setPlayer] = useState("");
  const [name] = useState(props.location.state.name);

  const [gamestate, setGameState] = useState({});

  const ENDPOINT = "http://localhost:9000";

  useEffect(() => {
    socket = io(ENDPOINT, {
      reconnection: false,
    });

    socket.emit("join", { name, room, newRoom }, (error) => {
      if (error) {
        setRender(2);
      }
    });

    return () => {
      socket.disconnect();
    };

    // eslint-disable-next-line
  }, [ENDPOINT]);

  useEffect(() => {
    socket.on("players", ({ players }) => {
      setPlayers(players);
    });

    socket.on("roomdata", ({ room, id }) => {
      if (room.host === id) {
        setIsHost(true);
      }
      setHost(room.host);
      setPlayer(id);
    });

    socket.on("newhost", (newhost) => {
      if (newhost === player) {
        setIsHost(true);
      }
      setHost(newhost);
    });

    socket.on("gamestart", ({ gamestate }) => {
      setGameState(gamestate);
      setRender(1);
    });
  }, [player]);

  const onClickStart = () => {
    socket.emit("startgame", { room });
  };

  switch (renderView) {
    case 1:
      return <Game socket={socket} gamestate={gamestate} host={isHost} />;
    case 2:
      return <Redirect to="/" />;
    default:
      return (
        <LobbyUI
          onClickStart={onClickStart}
          players={players}
          room={room}
          isHost={isHost}
          host={host}
        />
      );
  }
}

export default Lobby;
