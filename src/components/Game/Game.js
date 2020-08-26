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
  const [betOption, setBetOption] = useState(true);
  const [showBet, setShow] = useState({ animal: "", show: false });
  const [total, setTotal] = useState(0);

  const [chat, setChat] = useState([]);

  const [round, setRound] = useState(props.gamestate.round);
  const [timer, setTime] = useState(props.timer);
  const [maxRound] = useState(props.round);

  const [startTimer, setStartTimer] = useState(false);

  const [showOverlay, setShowOverlay] = useState(false);
  const [showRoundStart, setRoundStart] = useState(false);
  const [showRoundEnd, setRoundEnd] = useState(false);
  const [showGameOver, setGameOver] = useState(false);

  // The Game Flow
  // GAME START
  useEffect(() => {
    if (props.host) {
      socket.emit("showstartmodal");
    }
  }, []);

  // Use effect 2
  useEffect(() => {
    let interval;
    if (startTimer && props.host && timer >= 0) {
      interval = setInterval(() => {
        socket.emit("timer", { room: gamestate.roomId, timer });
      }, 1000);
    }
    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, [timer, startTimer]);

  // use effect 3
  useEffect(() => {
    socket.on("showstartmodal", () => {
      setRoundStart(true);
      setShowOverlay(true);
    });

    socket.on("timer", ({ second }) => {
      setTime(second);
    });

    socket.on("endtimer", () => {
      playerReady();
    });

    socket.on("newgamestate", ({ gamestate }) => {
      // document
      //   .getElementById("ready-button")
      //   .classList.remove("on-click-ready");
      setReady(false);
      setShow({ animal: "", show: false }); // has to do with betting
      setTotal(0); // has to do with betting
      setTime(timer); // set time back to timer
      // document.getElementById("dice1").style.visibility = "hidden";
      // document.getElementById("dice2").style.visibility = "hidden";
      // document.getElementById("dice3").style.visibility = "hidden";
      setGamestate(gamestate);
    });

    socket.on("gamestate", ({ gamestate }) => {
      setGamestate(gamestate);
    });

    socket.on("chatbox", ({ chat }) => {
      setChat(chat.message);
    });
    //SOCKET MODALS
    socket.on("hidestart", () => {
      setRoundStart(false);
      setTimeout(() => {
        setShowOverlay(false);
      }, 300);
      //document.getElementById("game-time").style.visibility = "visible";
      //document.getElementById("game-done").style.visibility = "visible";
      //document.getElementById("button-container").style.visibility = "visible";
      setTimeout(() => {
        setStartTimer(true);
      }, 600);
    });
    socket.on("hideend", ({ gameover }) => {
      setRoundEnd(false);
      revealDice();
      if (props.host && gameover) {
        setTimeout(() => {
          socket.emit("showgameover");
        }, 3400);
      }
      if (props.host && !gameover) {
        setTimeout(() => {
          socket.emit("showstartmodal");
        }, 3400); //timeout depends on how long our reveal is
      }
    });

    socket.on("showendmodal", ({ round }) => {
      //document.getElementById("game-time").style.visibility = "hidden";
      //document.getElementById("game-done").style.visibility = "hidden";
      //document.getElementById("button-container").style.visibility = "hidden";
      //interval
      setStartTimer(false);
      setRound(round);
      setRoundEnd(true);
      setShowOverlay(true);
    });
    socket.on("showgameover", () => {
      //document.getElementById("game-time").style.visibility = "hidden";
      //document.getElementById("game-done").style.visibility = "hidden";
      setStartTimer(false);
      setGameOver(true);
      setShowOverlay(true);
    });
  }, []);

  const playerReady = () => {
    showBet.show = false;
    //document.getElementById("ready-button").classList.add("on-click-ready");
    setReady(true);
    socket.emit("readyplayer", { gamestate });
  };

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

  const revealDice = () => {
    setTimeout(() => {
      // document.getElementById("dice1").style.zIndex = "1";
      // document.getElementById("dice1").style.visibility = "visible";
    }, 1000);
    setTimeout(() => {
      //document.getElementById("dice2").style.zIndex = "1";
      //document.getElementById("dice2").style.visibility = "visible";
    }, 2000);
    setTimeout(() => {
      // document.getElementById("dice3").style.zIndex = "1";
      //document.getElementById("dice3").style.visibility = "visible";
    }, 3000);
  };

  if (props.host && showRoundStart) {
    setTimeout(() => {
      socket.emit("hidestartmodal");
    }, 3000);
  }
  if (props.host && showRoundEnd) {
    setTimeout(() => {
      socket.emit("hideendmodal", { round, maxRound });
    }, 3000);
  }

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
            <Board
              amount={amount}
              ready={ready}
              showBet={showBet}
              total={total}
              bet={bet}
              betting={betting}
            />
            <Dashboard />
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
