import React, { useState, useEffect, useRef } from "react";
import { Redirect } from "react-router-dom";
import io from "socket.io-client";

// Components
import LobbyUI from "./LobbyUI";
import Game from "../Game/Game";
import Loading from "../Loading/Loading";
import DiceSpinner from "../Loading/DiceSpinner";
let socket;

function Lobby(props) {
  // State
  const [renderView, setRender] = useState(0);

  const [newRoom] = useState(
    props.location.state !== undefined ? props.location.state.newRoom : null
  );
  const [room] = useState(props.match.params.roomId);

  const [host, setHost] = useState("");
  const [isHost, setIsHost] = useState(false);

  const [players, setPlayers] = useState([]);
  const [player, setPlayer] = useState("");
  const [name] = useState(
    props.location.state !== undefined ? props.location.state.name : null
  );

  const [gamestate, setGameState] = useState({});

  const [timer, setTimer] = useState(60);
  const [round, setRound] = useState(7);
  const [balance, setBalance] = useState(100);

  //const ENDPOINT = "http://192.168.1.17:9000";
  const ENDPOINT = "http://localhost:9000";
  useEffect(() => {
    window.addEventListener("beforeunload", () => {
      setRender(4);
    });

    socket = io(ENDPOINT, {
      reconnection: false,
    });

    socket.emit("join", { name, room, newRoom }, (error) => {
      if (error) {
        //add interval here for loading
        setTimeout(function () {
          setRender(2);
        }, 2000);
      } else {
        //add interval here for loading
        setTimeout(function () {
          setRender(3);
        }, 2000);
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

    socket.on("timeropt", ({ timer }) => {
      setTimer(timer);
    });
    socket.on("roundopt", ({ round }) => {
      setRound(round);
    });
    socket.on("balanceopt", ({ balance }) => {
      setBalance(balance);
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

  const onSettingsChange = (setting, value) => {
    if (setting === "timer") {
      socket.emit("timerchange", { timer: value });
    } else if (setting === "round") {
      socket.emit("roundchange", { round: value });
    } else if (setting === "balance") {
      socket.emit("balancechange", { balance: value });
    }
  };

  switch (renderView) {
    case 1:
      return (
        <Game
          socket={socket}
          timer={timer}
          round={round}
          balance={balance}
          gamestate={gamestate}
          host={isHost}
        />
      );
    case 2:
      return <Redirect to="/" />;
    case 3:
      return (
        <LobbyUI
          onClickStart={onClickStart}
          players={players}
          room={room}
          host={host}
          isHost={isHost}
          timer={timer}
          round={round}
          balance={balance}
          onSettingsChange={onSettingsChange}
        />
      );
    case 4:
      return <Redirect to="/baucuacacop" />;
    default:
      return <DiceSpinner />;
  }
}

export default Lobby;
