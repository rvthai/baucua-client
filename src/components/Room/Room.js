import React, { useState, useEffect, useContext } from "react";
import SocketContext from "contexts/socket-context";

// Components
import Loader from "components/Loader/Loader";
import Lobby from "components/Lobby/Lobby";
import Game from "components/Game/Game";

function Room(props) {
  const socket = useContext(SocketContext);

  const [renderView, setRender] = useState(0);

  const [room, setRoom] = useState("");
  const [players, setPlayers] = useState([]);

  const [host, setHost] = useState("");
  const [isHost, setIsHost] = useState(false);

  const [timer, setTimer] = useState(30);
  const [rounds, setRounds] = useState(5);
  const [balance, setBalance] = useState(10);

  const [gamestate, setGamestate] = useState({});

  useEffect(() => {
    // Signal to server that data is needed to set up the room for user
    socket.emit("roomsetup");

    socket.on("roomdata", ({ room, host, settings }) => {
      if (host === socket.id) {
        setIsHost(true);
      }
      setRoom(room);
      setHost(host);

      setTimer(settings.time);
      setRounds(settings.rounds);
      setBalance(settings.balance);
    });

    socket.on("players", ({ players }) => {
      setPlayers(players);
    });

    socket.on("newhost", ({ host }) => {
      if (host === socket.id) {
        setIsHost(true);
      }
      setHost(host);
    });

    socket.on("timeropt", ({ timer }) => {
      setTimer(timer);
    });
    socket.on("roundsopt", ({ rounds }) => {
      setRounds(rounds);
    });
    socket.on("balanceopt", ({ balance }) => {
      setBalance(balance);
    });

    socket.on("gamestart", ({ gamestate }) => {
      setGamestate(gamestate);
      setRender(0); // Loader
      setTimeout(() => setRender(2), 1500);
    });
    socket.on("gamerestart", ({ gamestate }) => {
      setGamestate(gamestate);
      setRender(0); // Loader
      setTimeout(() => setRender(1), 1500);
    });

    setTimeout(() => setRender(1), 1500);
  }, [socket]);

  const onSettingsChange = (setting, value) => {
    if (setting === "timer") {
      socket.emit("timerchange", { timer: value });
    } else if (setting === "rounds") {
      socket.emit("roundschange", { rounds: value });
    } else if (setting === "balance") {
      socket.emit("balancechange", { balance: value });
    }
  };

  const onClickStart = () => {
    socket.emit("startgame", { balance });
  };

  // Render
  switch (renderView) {
    case 1:
      return (
        <Lobby
          room={room}
          players={players}
          host={host}
          isHost={isHost}
          timer={timer}
          rounds={rounds}
          balance={balance}
          onSettingsChange={onSettingsChange}
          onLogoClick={props.onRenderMainMenu}
          onClickStart={onClickStart}
        />
      );
    case 2:
      return (
        <Game
          timer={timer}
          gamestate={gamestate}
          isHost={isHost}
          host={host}
          onLogoClick={props.onRenderMainMenu}
        />
      );
    default:
      return <Loader />;
  }
}

export default Room;
