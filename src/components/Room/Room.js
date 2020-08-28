import React, { useState, useEffect, useContext, Suspense } from "react";
import SocketContext from "contexts/socket-context";

// Components
import Loader from "components/Loader/Loader";
import Lobby from "components/Lobby/Lobby";
import Game from "components/Game/Game";

function Room(props) {
  // State
  const socket = useContext(SocketContext);

  const [renderView, setRender] = useState(0);

  const [room, setRoom] = useState("");

  const [player, setPlayer] = useState("");
  const [players, setPlayers] = useState([]);

  const [host, setHost] = useState("");
  const [isHost, setIsHost] = useState(false);

  const [timer, setTimer] = useState(30);
  const [round, setRound] = useState(5);
  const [balance, setBalance] = useState(10);

  const [gamestate, setGameState] = useState({});

  useEffect(() => {
    socket.on("players", ({ players }) => {
      setPlayers(players);
    });

    socket.on("roomdata", ({ room, roomid, id }) => {
      if (room.host === id) {
        setIsHost(true);
      }
      setRoom(roomid);
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
      setRender(0);
      setTimeout(() => setRender(2), 0); // change time for loader
    });

    setTimeout(() => setRender(1), 0); // change time for loader
  }, [player, players, host, isHost, timer, round, balance]);

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
    socket.emit("startgame", { room });
  };

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
          host={isHost}
          onLogoClick={props.onRenderMainMenu}
        />
      );
    default:
      return <Loader />;
  }
}

export default Room;
