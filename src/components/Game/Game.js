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
  // will there be a problem if we dont check for the host condition
  if (showRoundStart) {
    setTimeout(() => {
      socket.emit("hidestartmodal");
    }, 3000);
  }

  if (showRoundEnd) {
    setTimeout(() => {
      socket.emit("hideendmodal", { maxRound });
    }, 6000);
  }

  // on mount
  useEffect(() => {
    socket.emit("showstartmodal");
  }, [socket]);

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

    socket.on("showstartmodal", ({ round }) => {
      setReady(false);
      setRound(round);
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

      if (gameover) {
        setTimeout(() => {
          socket.emit("showgameover");
        }, 1000);
      }

      if (!gameover) {
        setTimeout(() => {
          socket.emit("showstartmodal");
        }, 1000);
      }
    });

    socket.on("showendmodal", ({ gamestate }) => {
      setStartTimer(false);
      setTimeout(() => {
        setRoundEnd(true);
        setShowOverlay(true);
        setGamestate(gamestate);
      }, 7000); // time here is based on dice roll
    });

    socket.on("showgameover", () => {
      setGameOver(true);
    });
  }, []);

  // useEffect -> actions on timer and startTimer state change
  useEffect(() => {
    let interval;
    if (startTimer && timer >= 0) {
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
    var player = gamestate.players.filter((p) => socket.id === p.id);
    player = player[0];

    if (player.total < betAmount) {
      setBetAmount(0);
    }

    if (betAmount > 0) {
      socket.emit("bet", {
        room: gamestate.roomId,
        id: socket.id,
        amount: parseInt(betAmount),
        animal: pick,
      });

      if (player.total === betAmount) {
        setBetAmount(0);
      }
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
          <Players host={props.host} id={socket.id} gamestate={gamestate} />
          <div className="main-board">
            <Board ready={ready} bets={gamestate.bets} handleBet={bet} />
            <Dashboard
              ready={ready}
              gamestate={gamestate}
              id={socket.id}
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
          <RoundModal
            gamestate={gamestate}
            start={showRoundStart}
            round={round}
          />
        </CSSTransition>

        <CSSTransition
          in={showRoundEnd}
          timeout={300}
          unmountOnExit
          classNames="modal-round"
        >
          <RoundModal gamestate={gamestate} end={showRoundEnd} round={round} />
        </CSSTransition>

        <CSSTransition
          in={showGameOver}
          timeout={300}
          unmountOnExit
          classNames="modal-round"
        >
          <RoundModal
            gamestate={gamestate}
            isHost={props.isHost}
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
