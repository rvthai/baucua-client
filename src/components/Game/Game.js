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
import Round from "./Round/Round";

// Fontawesome Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentAlt } from "@fortawesome/free-solid-svg-icons";

// Logo
import Logo from "../../assets/logo/logo.png";

function Game(props) {
  const socket = useContext(SocketContext);

  const [gamestate, setGamestate] = useState(props.gamestate);

  const [ready, setReady] = useState(false);

  const [chat, setChat] = useState(false);
  const [messages, setMessages] = useState([]);

  const [round, setRound] = useState(props.gamestate.round);
  const [timer, setTime] = useState(props.timer);

  const [betAmount, setBetAmount] = useState(0);

  const [showOverlay, setShowOverlay] = useState(false);
  const [showClearOverlay, setShowClearOverlay] = useState(false);
  const [showRoundStart, setRoundStart] = useState(false);
  const [showRoundEnd, setRoundEnd] = useState(false);
  const [showGameOver, setGameover] = useState(false);
  const [showTimesUp, setTimesUp] = useState(false);
  const [showAllBetsIn, setAllBetsIn] = useState(false);

  const [results, setResults] = useState([]);

  // useEffect on the start of each round
  useEffect(() => {
    if (round === 1) {
      setRoundStart(true);
      setShowOverlay(true);
    }

    if (props.isHost) {
      socket.emit("roundstart");
    }
    // eslint-disable-next-line
  }, [socket, round]);

  // useEffect on gamestate changes
  useEffect(() => {
    socket.on("newgamestate", ({ gamestate }) => {
      setGamestate(gamestate);
    });

    socket.on("timer", ({ current_time }) => {
      setTime(current_time);
    });

    socket.on("nextround", ({ round }) => {
      setRound(round);
      setReady(false);
    });

    socket.on("chatbox", ({ chatbox }) => {
      setMessages(chatbox);
    });
  }, [socket]);

  // useEffect on displaying transition events
  useEffect(() => {
    socket.on("showround", () => {
      setRoundStart(true);
      setShowOverlay(true);
    });

    socket.on("hideround", () => {
      setRoundStart(false);
      setShowOverlay(false);
    });

    socket.on("showtimesup", () => {
      setTimesUp(true);
      setShowClearOverlay(true);
    });

    socket.on("hidetimesup", () => {
      setTimesUp(false);
      setShowClearOverlay(false);
    });

    socket.on("showallbetsin", () => {
      setAllBetsIn(true);
      setShowClearOverlay(true);
    });

    socket.on("hideallbetsin", () => {
      setAllBetsIn(false);
      setShowClearOverlay(false);
    });

    socket.on("showresults", ({ results }) => {
      setResults(results);
      setRoundEnd(true);
      setShowOverlay(true);
    });

    socket.on("hideresults", () => {
      setRoundEnd(false);
    });

    socket.on("gameover", ({ results }) => {
      setResults(results);
      setGameover(true);
      setShowOverlay(true);
    });
  }, [socket]);

  const playerReady = () => {
    socket.emit("readyplayer");
    setReady(true);
  };

  const betting = (dollar) => {
    setBetAmount(dollar);
  };

  const bet = (pick) => {
    const player = gamestate.players.filter((p) => socket.id === p.id)[0];

    if (player.total < betAmount) {
      setBetAmount(0);
      return null;
    }

    if (betAmount > 0) {
      socket.emit("bet", {
        id: socket.id,
        amount: parseInt(betAmount),
        animal: pick,
      });

      if (player.total === betAmount) {
        setBetAmount(0);
      }
    }
  };

  const onChatClick = () => {
    if (chat) {
      document.body.style.overflow = "auto";
      setChat(false);
    } else {
      document.body.style.overflow = "hidden";
      setChat(true);
    }
  };

  const onCollapseClick = () => {
    document.body.style.overflow = "auto";
    setChat(false);
  };

  return (
    <div className="game-page-container">
      <CSSTransition in={chat} timeout={100} unmountOnExit classNames="dialog">
        <Chat
          messages={messages}
          gamestate={gamestate}
          onCollapseClick={onCollapseClick}
        />
      </CSSTransition>

      <div className="mini-logo-wrapper">
        <img
          src={Logo}
          alt="logo"
          className="mini-logo"
          onClick={props.onLogoClick}
        />
      </div>

      <div className="game-container">
        <Header timer={timer} round={round} />
        <div className="game">
          <Players id={socket.id} gamestate={gamestate} />
          <div className="game-board">
            <Board ready={ready} bets={gamestate.bets} handleBet={bet} />
            <Dashboard
              id={socket.id}
              ready={ready}
              gamestate={gamestate}
              handleReady={playerReady}
              handleBetting={betting}
            />
          </div>
        </div>

        {showOverlay ? <div id="overlay"></div> : null}
        {showClearOverlay ? <div id="clear-overlay"></div> : null}

        <CSSTransition
          in={showRoundStart}
          timeout={300}
          unmountOnExit
          classNames="round-modal"
        >
          <Round start={showRoundStart} round={round} gamestate={gamestate} />
        </CSSTransition>
        <CSSTransition
          in={showTimesUp}
          timeout={300}
          unmountOnExit
          classNames="round-modal"
        >
          <Round timesup={showTimesUp} gamestate={gamestate} />
        </CSSTransition>
        <CSSTransition
          in={showAllBetsIn}
          timeout={300}
          unmountOnExit
          classNames="round-modal"
        >
          <Round rolling={showAllBetsIn} gamestate={gamestate} />
        </CSSTransition>

        <CSSTransition
          in={showRoundEnd}
          timeout={300}
          unmountOnExit
          classNames="round-modal"
        >
          <Round results={results} gamestate={gamestate} end={showRoundEnd} />
        </CSSTransition>

        <CSSTransition
          in={showGameOver}
          timeout={300}
          unmountOnExit
          classNames="round-modal"
        >
          <Round
            gameover={showGameOver}
            results={results}
            isHost={props.isHost}
            gamestate={gamestate}
            return={props.onLogoClick}
          />
        </CSSTransition>
      </div>
      <div className="chat-btn-wrapper">
        <FontAwesomeIcon
          id="chat-btn"
          icon={faCommentAlt}
          size="3x"
          onClick={onChatClick}
        />
      </div>
    </div>
  );
}

export default Game;

/*
  // useEffect - Handles round transitions
  useEffect(() => {
    // Transition from round banner to round start
    if (props.isHost && showRoundStart) {
      setTimeout(() => {
        socket.emit("hidestartmodal");
      }, 3000);
    }

    // Transition from results to round banner
    if (props.isHost && showRoundEnd) {
      setTimeout(() => {
        socket.emit("hideendmodal");
      }, 5000);
    }
  }, [socket, showRoundStart, showRoundEnd]);

  // useEffect - Manages game flow and game state
  useEffect(() => {
    socket.on("newgamestate", ({ gamestate }) => {
      setGamestate(gamestate);
    });

    socket.on("timer", ({ second }) => {
      setTime(second);
    });

    socket.on("endtimer", () => {
      socket.emit("endround");
      setReady(true);
      //playerReady(false); // this could be the problem i didnt supply it with a parameter before
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
      socket.emit("timer", true);
      setTime(timer);
    });

    socket.on("showendmodal", ({ gamestate }) => {
      setStartTimer(false);
      setTimeout(() => {
        setRoundEnd(true);
        setShowOverlay(true);
        setGamestate(gamestate);
      }, 7000);
    });

    socket.on("hideend", ({ gameover }) => {
      setRoundEnd(false);

      if (props.isHost && gameover) {
        setTimeout(() => {
          socket.emit("showgameover");
        }, 1000);
      }

      if (props.isHost && !gameover) {
        setTimeout(() => {
          socket.emit("showstartmodal");
        }, 1000);
      }
    });

    socket.on("showgameover", () => {
      setGameover(true);
    });
    // eslint-disable-next-line
  }, [socket]);

  // useEffect - Manages the chat events
  useEffect(() => {
    socket.on("chatbox", ({ chatbox }) => {
      setMessages(chatbox);
    });
  }, [socket]);

  // useEffect - Manages the timer
  useEffect(() => {
    socket.on("timer", ({ timer }) => {
      if (timer < 0) {
        socket.emit("timer", false);
      } else {
        setTime(timer);
      }
    });
    // let interval;
    // if (props.isHost && startTimer && timer >= 0) {
    //   interval = setInterval(() => {
    //     socket.emit("timer", { timer });
    //   }, 1000);
    // }
    // return () => clearInterval(interval);
  }, [socket, timer, startTimer]);
*/
// seems like endtimer is problem not when bet is clicked
