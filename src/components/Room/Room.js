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
  const [round, setRound] = useState(5);
  const [balance, setBalance] = useState(10);

  const [gamestate, setGamestate] = useState({});

  useEffect(() => {
    socket.emit("roomsetup");

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

    socket.on("roomdata", ({ room, settings, host, id }) => {
      if (host === id) {
        setIsHost(true);
      }
      setRoom(room);
      setHost(host);

      setTimer(settings.time);
      setRound(settings.rounds);
      setBalance(settings.balance);
    });

    socket.on("players", ({ players }) => {
      setPlayers(players);
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
      if (newhost === socket.id) {
        setIsHost(true);
      }
      setHost(newhost);
    });

    setTimeout(() => setRender(1), 1500);

    return () => {
      socket.off();
    };
  }, [socket]);

  const onSettingsChange = (setting, value) => {
    if (setting === "timer") {
      socket.emit("timerchange", { timer: value });
    } else if (setting === "round") {
      socket.emit("roundchange", { round: value });
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
          round={round}
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
          round={round}
          balance={balance}
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
