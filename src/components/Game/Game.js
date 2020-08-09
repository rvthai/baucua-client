import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "./Game.css";
import Logo from "../../assets/logo.png";

import Header from "./Header/Header";
import Board from "./Board/Board";
import Players from "./Players/Players";
import Chat from "./Chat/Chat";

function Game(props) {
  const [socket] = useState(props.socket);
  const [gamestate, setGamestate] = useState(props.gamestate);

  const [ready, setReady] = useState(false);
  const [betOption, setBetOption] = useState(true);
  const [showBet, setShow] = useState({ animal: "", show: false });
  const [total, setTotal] = useState(0);

  const [chat, setChat] = useState([]);

  const [timer, setTime] = useState(60);

  useEffect(() => {
    socket.on("gamestate", ({ gamestate }) => {
      setGamestate(gamestate);
    });

    socket.on("chatbox", ({ chat }) => {
      setChat(chat.message);
    });

    socket.on("timer", ({ second }) => {
      setTime(second);
    });

    socket.on("endtimer", () => {
      playerReady();
    });

    socket.on("newgamestate", ({ gamestate }) => {
      document
        .getElementById("ready-button")
        .classList.remove("on-click-ready");
      setReady(false);
      setShow({ animal: "", show: false });
      setTotal(0);
      setTime(60);
      setGamestate(gamestate);
    });
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    let interval;
    if (props.host && timer >= 0) {
      interval = setInterval(() => {
        socket.emit("timer", { room: gamestate.roomId, timer });
      }, 1000);
    }
    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, [timer]);

  const amount = (event) => {
    setShow({ animal: event.target.id, show: true });
    let total = 0;
    if (gamestate.bets.length > 0) {
      const pb = gamestate.bets.find(
        (user) => user.id === socket.id && user.animal === event.target.id
      );
      if (pb) {
        total = pb.amount;
      }
    }
    setTotal(total);
  };

  const bet = (event) => {
    if (betOption) {
      setTotal(total + parseInt(event.target.value));
      socket.emit("bet", {
        room: gamestate.roomId,
        id: socket.id,
        amount: parseInt(event.target.value),
        animal: showBet.animal,
      });
    } else {
      if (total - parseInt(event.target.value) >= 0) {
        setTotal(total - parseInt(event.target.value));
        socket.emit("bet", {
          room: gamestate.roomId,
          id: socket.id,
          amount: -1 * parseInt(event.target.value),
          animal: showBet.animal,
        });
      }
    }
  };

  const betting = (event) => {
    if (event.target.id === "plus-button") {
      document.getElementById("minus-button").classList.remove("minus-select");
      document.getElementById("plus-button").classList.remove("plus-select");
      setBetOption(true);
    } else {
      document.getElementById("minus-button").classList.add("minus-select");
      document.getElementById("plus-button").classList.add("plus-select");
      setBetOption(false);
    }
  };

  const playerReady = () => {
    showBet.show = false;
    document.getElementById("ready-button").classList.add("on-click-ready");
    setReady(true);
    socket.emit("readyplayer", { gamestate });
  };

  const onKeyUp = (event) => {
    if (event.target.value.length > 0 && event.key === "Enter") {
      const user = gamestate.players.find((p) => p.id === socket.id);
      if (user) {
        let input = document.getElementById("message");
        socket.emit("sendMessage", { name: user.name, message: input.value });
        input.value = "";
      }
    }
  };

  return (
    <div className="game-container">
      <div className="game-header-container">
        <div className="game-logo">
          <Link to="/">
            <img src={Logo} className="mini-logo" />
          </Link>
        </div>
        <div className="game-leave">
          <a id="ingame-leave" href="/">
            <p>Leave</p>
          </a>
        </div>
      </div>
      <div className="game-main-container">
        <Header
          timer={timer}
          gamestate={gamestate}
          ready={ready}
          playerReady={playerReady}
        />

        <div className="game-game-container">
          <Players host={props.host} gamestate={gamestate} />
          <Board
            amount={amount}
            ready={ready}
            showBet={showBet}
            total={total}
            bet={bet}
            betting={betting}
          />
          <Chat chat={chat} onKeyUp={onKeyUp} />
        </div>
      </div>
      <div className="game-footer-container"></div>
    </div>
  );
}

export default Game;
