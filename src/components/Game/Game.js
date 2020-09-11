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
  const [readyUp, setReadyUp] = useState(false);

  const [chat, setChat] = useState(false);
  const [messages, setMessages] = useState([]);

  const [round, setRound] = useState(props.gamestate.round);
  const [maxRound] = useState(props.round);

  const [startTimer, setStartTimer] = useState(false);
  const [timer, setTime] = useState(props.timer);

  const [betAmount, setBetAmount] = useState(0);

  const [showOverlay, setShowOverlay] = useState(false);
  const [showRoundStart, setRoundStart] = useState(false);
  const [showRoundEnd, setRoundEnd] = useState(false);
  const [showGameOver, setGameover] = useState(false);

  // Transition from round banner to round start
  if (props.isHost && showRoundStart) {
    setTimeout(() => {
      socket.emit("hidestartmodal");
    }, 3000);
  }

  // Transition from results to round banner
  if (props.isHost && showRoundEnd) {
    setTimeout(() => {
      socket.emit("hideendmodal", { maxRound });
    }, 5000);
  }

  // useEffect - Show first round at the start of every game
  useEffect(() => {
    if (props.isHost) {
      socket.emit("showstartmodal");
    }
  }, [socket]);

  // useEffect - Manage round transitions and changes in gamestate
  useEffect(() => {
    socket.on("newgamestate", ({ gamestate }) => {
      setGamestate(gamestate);
    });

    socket.on("timer", ({ second }) => {
      setTime(second);
    });

    socket.on("endtimer", () => {
      playerReady();
    });

    socket.on("showstartmodal", ({ round }) => {
      setReady(false);
      setReadyUp(false);
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
  }, []);

  // useEffect - Manages the timer
  useEffect(() => {
    let interval;
    if (props.isHost && startTimer && timer >= 0) {
      interval = setInterval(() => {
        socket.emit("timer", { timer });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [timer, startTimer]);

  // useEffect - Manages the chat events
  useEffect(() => {
    socket.on("chatbox", ({ chatbox }) => {
      setMessages(chatbox);
    });
  }, []);

  const playerReady = (button_clicked) => {
    if (button_clicked) {
      setReadyUp(true);
    }
    setReady(true);
    socket.emit("readyplayer", { gamestate });
  };

  const betting = (dollar) => {
    setBetAmount(dollar);
  };

  const bet = (pick) => {
    const player = gamestate.players.filter((p) => socket.id === p.id)[0];

    if (player.total < betAmount) {
      setBetAmount(0);
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
      setChat(false);
    } else {
      setChat(true);
    }
  };

  const onCollapseClick = () => {
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
        <img src={Logo} className="mini-logo" onClick={props.onLogoClick} />
      </div>

      <div className="game-container">
        <Header timer={timer} round={round} />
        <div className="game">
          <Players id={socket.id} readyUp={readyUp} gamestate={gamestate} />
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

        <CSSTransition
          in={showRoundStart}
          timeout={300}
          unmountOnExit
          classNames="round-modal"
        >
          <Round start={showRoundStart} round={round} gamestate={gamestate} />
        </CSSTransition>

        <CSSTransition
          in={showRoundEnd}
          timeout={300}
          unmountOnExit
          classNames="round-modal"
        >
          <Round gamestate={gamestate} end={showRoundEnd} />
        </CSSTransition>

        <CSSTransition
          in={showGameOver}
          timeout={300}
          unmountOnExit
          classNames="round-modal"
        >
          <Round
            gameover={showGameOver}
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
