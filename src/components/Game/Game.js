import React, { useState, useEffect, useContext } from "react";
import { CSSTransition } from "react-transition-group";
import SocketContext from "contexts/socket-context";
import "./Game.css";

// Components
import Header from "./Header/Header";
import Board from "./Board/Board";
import Players from "./Players/Players";
import Chat from "./Chat/Chat";
import Dashboard from "./Dashboard/Dashboard";
import RoundModal from "./RoundModal/RoundModal";

// Fontawesome Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots } from "@fortawesome/free-solid-svg-icons";

// Logo
import Logo from "../../assets/logo/logo.png";

function Game(props) {
  const socket = useContext(SocketContext);

  const [gamestate, setGamestate] = useState(props.gamestate);

  const [ready, setReady] = useState(false);

  // const [chat, setChat] = useState([]);

  const [round, setRound] = useState(props.gamestate.round);
  const [maxRound] = useState(props.round);

  const [startTimer, setStartTimer] = useState(false);
  const [timer, setTime] = useState(props.timer);

  const [showOverlay, setShowOverlay] = useState(false);
  const [showRoundStart, setRoundStart] = useState(false);
  const [showRoundEnd, setRoundEnd] = useState(false);
  const [showGameOver, setGameOver] = useState(false);

  const [betAmount, setBetAmount] = useState(0);

  // The Game Flow
  // GAME START
  if (showRoundStart) {
    setTimeout(() => {
      socket.emit("hidestartmodal");
    }, 3000);
  }

  if (showRoundEnd) {
    setTimeout(() => {
      socket.emit("hideendmodal", { round, maxRound });
    }, 3000);
  }
  // useEffect -> emit the start modal
  useEffect(() => {
    if (props.host) {
      socket.emit("showstartmodal");
    }
  }, []);

  // useEffect -> game transition listeners
  useEffect(() => {
    socket.on("timer", ({ second }) => {
      setTime(second);
    });

    socket.on("endtimer", () => {
      playerReady();
    });

    socket.on("newgamestate", ({ gamestate }) => {
      setGamestate(gamestate);
    });

    socket.on("showstartmodal", () => {
      setRoundStart(true);
      setShowOverlay(true);
    });

    socket.on("hidestart", () => {
      setRoundStart(false);
      setShowOverlay(false);
      setStartTimer(true);
      setTime(timer);
    });

    socket.on("hideend", ({ gameover }) => {
      setRoundEnd(false);
      setReady(false);

      if (props.host && gameover) {
        setTimeout(() => {
          socket.emit("showgameover");
        }, 3400);
      }

      if (props.host && !gameover) {
        setTimeout(() => {
          socket.emit("showstartmodal");
        }, 3000);
      }
    });
  }, []);

  // useEffect -> actions on timer and startTimer state change
  useEffect(() => {
    socket.on("showendmodal", ({ round }) => {
      setStartTimer(false);
      setTimeout(() => {
        setRoundEnd(true);
        setShowOverlay(true);
        setRound(round);
      }, 6000);
    });

    let interval;
    if (startTimer && props.host && timer >= 0) {
      interval = setInterval(() => {
        socket.emit("timer", { room: gamestate.roomId, timer });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [timer, startTimer]);

  // Component Functions
  const playerReady = () => {
    setReady(true);
    socket.emit("readyplayer", { gamestate });
  };

  const bet = (pick) => {
    if (betAmount > 0) {
      socket.emit("bet", {
        room: gamestate.roomId,
        id: socket.id,
        amount: parseInt(betAmount),
        animal: pick,
      });
    }
  };

  const betting = (dollar) => {
    setBetAmount(dollar);
  };

  // const onKeyUp = (event) => {
  //   if (event.target.value.length > 0 && event.key === "Enter") {
  //     const user = gamestate.players.find((p) => p.id === socket.id);
  //     if (user) {
  //       let input = document.getElementById("message");
  //       socket.emit("sendMessage", { name: user.name, message: input.value });
  //       input.value = "";
  //     }
  //   }
  // };

  return (
    <div className="game-page-container">
      <div className="nav">
        <div className="mini-logo-wrapper">
          <img src={Logo} className="mini-logo" onClick={props.onLogoClick} />
        </div>
        <FontAwesomeIcon className="chat-button" icon={faCommentDots} />
      </div>
      <div className="game-container">
        <Header timer={timer} round={round} gamestate={gamestate} />
        <div className="bottom-half">
          <Players host={props.host} gamestate={gamestate} />
          <div className="main-board">
            <Board ready={ready} bets={gamestate.bets} handleBet={bet} />
            <Dashboard
              ready={ready}
              handleBet={playerReady}
              handleBetting={betting}
            />
          </div>
        </div>

        {showOverlay ? <div id="overlay"></div> : null}
        <CSSTransition
          in={showRoundStart}
          timeout={300}
          unmountOnExit
          classNames="modal-round"
        >
          <RoundModal start={showRoundStart} round={round} />
        </CSSTransition>

        <CSSTransition
          in={showRoundEnd}
          timeout={300}
          unmountOnExit
          classNames="modal-round"
        >
          <RoundModal end={showRoundEnd} round={round} />
        </CSSTransition>

        <CSSTransition
          in={showGameOver}
          timeout={300}
          unmountOnExit
          classNames="modal-round"
        >
          <RoundModal
            gameover={showGameOver}
            round={round}
            return={props.onLogoClick}
          />
        </CSSTransition>
      </div>
    </div>
  );
}

export default Game;
