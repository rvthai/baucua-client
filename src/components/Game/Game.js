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
  const [maxRound] = useState(props.round);

  // forsure
  const [startTimer, setStartTimer] = useState(false);
  const [timer, setTime] = useState(props.timer); //props.timer

  // displays for banner
  const [showOverlay, setShowOverlay] = useState(false);
  const [showRoundStart, setRoundStart] = useState(false);
  const [showRoundEnd, setRoundEnd] = useState(false);
  const [showGameOver, setGameOver] = useState(false);

  // betting
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
  // modal stuff- emit
  useEffect(() => {
    socket.emit("showstartmodal");
  }, []);

  // modal stuff - listener
  useEffect(() => {
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
      if (props.host && gameover) {
        setTimeout(() => {
          socket.emit("showgameover");
        }, 3400);
      }
      if (!gameover) {
        // had a if props.host condition to it
        setTimeout(() => {
          socket.emit("showstartmodal");
        }, 3000); //timeout depends on how long our reveal is
      }
    });
  }, []);

  // emit timer -emit // THERE COULD BE A PROBLEM HERE
  useEffect(() => {
    socket.on("showendmodal", ({ round }) => {
      setStartTimer(false);
      setTimeout(() => {
        setRoundEnd(true);
        setShowOverlay(true);
        setRound(round);
      }, 6000);
    });

    let interval; // THE PROBLEM IS HERERERERE MAYBE
    if (startTimer && props.host && timer >= 0) {
      interval = setInterval(() => {
        socket.emit("timer", { room: gamestate.roomId, timer });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [timer, startTimer]);

  // timer - listener
  useEffect(() => {
    socket.on("timer", ({ second }) => {
      setTime(second);
    });

    socket.on("endtimer", () => {
      playerReady();
    });
  }, []);

  useEffect(() => {
    socket.on("newgamestate", ({ gamestate }) => {
      setGamestate(gamestate);
    });
  }, []);

  const playerReady = () => {
    //showBet.show = false;
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

  const bet = (pick) => {
    if (betAmount > 0) {
      socket.emit("bet", {
        room: gamestate.roomId,
        id: socket.id,
        amount: parseInt(betAmount),
        animal: pick,
      });
    }
    // if (betOption) {
    //   setTotal(total + parseInt(event.target.value));
    //   socket.emit("bet", {
    //     room: gamestate.roomId,
    //     id: socket.id,
    //     amount: parseInt(event.target.value),
    //     animal: showBet.animal,
    //   });
    // } else {
    //   if (total - parseInt(event.target.value) >= 0) {
    //     setTotal(total - parseInt(event.target.value));
    //     socket.emit("bet", {
    //       room: gamestate.roomId,
    //       id: socket.id,
    //       amount: -1 * parseInt(event.target.value),
    //       animal: showBet.animal,
    //     });
    //   }
    // }
  };

  const betting = (dollar) => {
    setBetAmount(dollar);
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
              bets={gamestate.bets}
              handleBet={bet}
              // betting={betting}
            />
            <Dashboard handleBetting={betting} />
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

// Use effect 2
// useEffect(() => {
//   let interval;
//   if (startTimer && props.host && timer >= 0) {
//     interval = setInterval(() => {
//       socket.emit("timer", { room: gamestate.roomId, timer });
//     }, 1000);
//   }
//   return () => clearInterval(interval);
// }, [timer, startTimer]);

// use effect 3
// useEffect(() => {
//   socket.on("showstartmodal", () => {
//     setRoundStart(true);
//     setShowOverlay(true);
//   });

//   socket.on("timer", ({ second }) => {
//     setTime(second);
//   });

//   socket.on("endtimer", () => {
//     playerReady();
//   });

//   socket.on("newgamestate", ({ gamestate }) => {
//     setReady(false);
//     setShow({ animal: "", show: false }); // has to do with betting
//     setTotal(0); // has to do with betting
//     //setGamestate(gamestate);
//     // setTime(timer)
//   });

//   socket.on("gamestate", ({ gamestate }) => {
//     setGamestate(gamestate);
//   });

//   socket.on("chatbox", ({ chat }) => {
//     setChat(chat.message);
//   });
//   //SOCKET MODALS
//   socket.on("hidestart", () => {
//     setRoundStart(false);
//     setTimeout(() => {
//       setShowOverlay(false);
//     }, 300);
//     //document.getElementById("game-time").style.visibility = "visible";
//     //document.getElementById("game-done").style.visibility = "visible";
//     //document.getElementById("button-container").style.visibility = "visible";
//     setTimeout(() => {
//       setStartTimer(true);
//     }, 600);
//   });
//   socket.on("hideend", ({ gameover }) => {
//     setRoundEnd(false);
//     revealDice();
//     if (props.host && gameover) {
//       setTimeout(() => {
//         socket.emit("showgameover");
//       }, 3400);
//     }
//     if (props.host && !gameover) {
//       setTimeout(() => {
//         socket.emit("showstartmodal");
//       }, 3400); //timeout depends on how long our reveal is
//     }
//   });

//   socket.on("showendmodal", ({ round }) => {
//     //document.getElementById("game-time").style.visibility = "hidden";
//     //document.getElementById("game-done").style.visibility = "hidden";
//     //document.getElementById("button-container").style.visibility = "hidden";
//     //interval
//     setStartTimer(false);
//     setRound(round);
//     setRoundEnd(true);
//     setShowOverlay(true);
//   });
//   socket.on("showgameover", () => {
//     //document.getElementById("game-time").style.visibility = "hidden";
//     //document.getElementById("game-done").style.visibility = "hidden";
//     setStartTimer(false);
//     setGameOver(true);
//     setShowOverlay(true);
//   });
// }, []);
// gamestate
//   socket.on("hideend", ({ gameover }) => {
//     setRoundEnd(false);
//     revealDice();
//     if (props.host && gameover) {
//       setTimeout(() => {
//         socket.emit("showgameover");
//       }, 3400);
//     }
//     if (props.host && !gameover) {
//       setTimeout(() => {
//         socket.emit("showstartmodal");
//       }, 3400); //timeout depends on how long our reveal is
//     }
//   });
