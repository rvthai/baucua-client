import React, { useState, useEffect } from "react";

import ScrollToBottom from "react-scroll-to-bottom";

import "./Game.css";
import Logo from "../../assets/logo.png";
import Deer from "../../assets/deer.png";
import Gourd from "../../assets/gourd.png";
import Rooster from "../../assets/rooster.png";
import Fish from "../../assets/fish.png";
import Crab from "../../assets/crab.png";
import Shrimp from "../../assets/shrimp.png";

import Player from "../Player/Player";

function Chatbox(props){
  const chat = props.chat;
  const message = [];
  for (let i = 0; i < chat.length; ++i){
    message.push(
      <div className="message">
        <p className="message-content">{chat[i].name}: {chat[i].message}</p>
      </div>)
  }
  return(
  <ScrollToBottom className="scroll-chat">
    {message}
  </ScrollToBottom>
)}

function Game(props){
  const [socket] = useState(props.socket);
  const [gamestate, setGamestate] = useState(props.gamestate);

  const [ready, setReady] = useState(false);
  const [betOption, setBetOption] = useState(true);
  const [showBet, setShow] = useState({animal: "", show:false});
  const [total, setTotal] = useState(0);

  const [chat, setChat] = useState([]);

  useEffect(()=>{
    socket.on("gamestate", ({gamestate}) => {
      setGamestate(gamestate);
    })

    socket.on("chatbox", ({chat}) => {
      setChat(chat.message);
    })

    socket.on("newgamestate", ({gamestate}) => {
      document.getElementById("ready-button").classList.remove("on-click-ready");
      setReady(false);
      setShow({animal: "", show:false});
      setTotal(0);
      setGamestate(gamestate);
    })
    //eslint-disable-next-line
  }, [])

  const amount = (event) => {
    setShow({animal: event.target.id, show:true});
    let total = 0;
    if (gamestate.bets.length > 0){
      const pb = gamestate.bets.find((user) => user.id === socket.id && user.animal === event.target.id);
      if (pb){
        total = pb.amount;
      }
    }
    setTotal(total);
  }

  const bet = (event) =>{
    if (betOption){
      setTotal(total+parseInt(event.target.value));
      socket.emit("bet", ({room:gamestate.roomId, id:socket.id, amount:parseInt(event.target.value), animal:showBet.animal}));
    }else{
      if (total - parseInt(event.target.value) >= 0){
        setTotal(total-parseInt(event.target.value));
        socket.emit("bet", ({room:gamestate.roomId, id:socket.id, amount:-1*parseInt(event.target.value), animal:showBet.animal}));
      }
    }
    
  }

  const betting = (event) => {
    if (event.target.id === "plus-button"){
      document.getElementById("minus-button").classList.remove("minus-select");
      document.getElementById("plus-button").classList.remove("plus-select");
      setBetOption(true);
    }else{
      document.getElementById("minus-button").classList.add("minus-select");
      document.getElementById("plus-button").classList.add("plus-select");
      setBetOption(false);
    }
  }

  const playerReady = () => {
    showBet.show = false;
    const player = gamestate.players.find((user) => user.id === socket.id);
    player.ready = true;
    document.getElementById("ready-button").classList.add("on-click-ready");
    setReady(true)
    socket.emit("readyplayer", ({gamestate}));
  }

  const onKeyUp = (event) => {
    if (event.target.value.length > 0 && event.key === 'Enter'){
      const user = gamestate.players.find((p) => p.id === socket.id);
      if (user){
        let input = document.getElementById("message");
        socket.emit("sendMessage", ({name:user.name, message:input.value}));
        input.value = "";
      }
    }
  }
  
  return(
    <div className="game-container">
      <div className="game-header-container">
        <div className="game-logo"><a href="/"><img id="ingame-logo"src={Logo}alt="logo"/></a></div>
        <div className="game-leave"><a id="ingame-leave" href="/"><p>Leave</p></a></div>
      </div>
      <div className="game-main-container">
        <div className="main-header-container">
          <div className="game-time"><p>Time</p></div>
          <div className="game-dice">
            <div id="dice1" className="game-die">{gamestate.dice.length > 0 ? gamestate.dice[0]:null}</div>
            <div id="dice2" className="game-die">{gamestate.dice.length > 0 ? gamestate.dice[1]:null}</div>
            <div id="dice3" className="game-die">{gamestate.dice.length > 0 ? gamestate.dice[2]:null}</div>
          </div>
          <div className="game-done">
            <button id="ready-button" className="ready-button" onClick={!ready ? playerReady: null}>READY</button></div>
        </div>
        <div className="game-game-container">
          <div className="game-players-container">
            <div className="player-header-container">
              <p>Players</p>
            </div>
            <div className="players-container">
              {gamestate.players.map((player, index) => (
                <div key={index+"game-card"}className="game-player-card"> 
                  <Player key={index} player={player} host={props.host} />
                  <div key={index+"total"}className="game-player-total">
                    <p>Total: {gamestate.players[index].total}</p>
                    <p>Current: {gamestate.players[index].current}</p>
                  </div>
                </div>
                ))}
            </div>
          </div>
          <div className="game-board-container">
            <div className="game-choose">
              <div className="animals">
                <div className="button-container">
                  <button id="deer" onClick={!ready ? amount : null} value="deer">
                    <img id="deer"className="animal-img" src={Deer} alt="deer"/></button>
                  <button id="bau" onClick={!ready ? amount : null} value="bau">
                    <img id="bau" className="animal-img" src={Gourd} alt="gourd"/></button>
                  <button id="chicken" onClick={!ready ? amount : null} value="chicken">
                    <img id="chicken" className="animal-img" src={Rooster} alt="rooster"/></button>
                  <button id="fish" onClick={!ready ? amount : null} value="fish">
                    <img id="fish" className="animal-img" src={Fish} alt="fish"/></button>
                  <button id="crab" onClick={!ready ? amount : null} value="crab">
                    <img id="crab" className="animal-img" src={Crab} alt="crab"/></button>
                  <button id="shrimp" onClick={!ready ? amount : null} value="shrimp">
                    <img id="shrimp" className="animal-img" src={Shrimp} alt="shrimp"/></button>
                </div>
              </div>
            </div>
            {showBet.show ? 
            <div className="game-bet">
              <div className="bet-options">
                <div className="bet-animal">
                  <p> BET: {showBet.animal.toUpperCase()} </p>
                  <p>${total}</p>
                </div>
                <div className="plus-or-minus">
                  <button id="plus-button" className="plus-button" onClick={betting}>+</button>
                  <button id="minus-button" className="minus-button" onClick={betting}>-</button>
                </div>
              </div>
              <div className="bet-buttons">
                <button value={1} onClick={bet}>1</button>
                <button value={5} onClick={bet}>5</button>
                <button value={10} onClick={bet}>10</button>
                <button value={20} onClick={bet}>20</button>
                <button value={50} onClick={bet}>50</button>
                <button value={100} onClick={bet}>100</button>
              </div>
            </div> 
            : null}
          </div>
          <div className="game-chat-container">
            <div className="chat-header-container"><p>Chat</p></div>
            <div className="chat-messages">
              <Chatbox chat={chat}/>
            </div>
            <div className="chat-input">
              <input 
                autoComplete="off" 
                placeholder="click to start typing"  
                id="message" 
                type="text" 
                onKeyUp={onKeyUp}/>
              </div>
          </div>
        </div>
      </div>
      <div className="game-footer-container"></div>
    </div>
  )
}


export default Game;
