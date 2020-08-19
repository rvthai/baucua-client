import React from "react";

import "./Board.css";

import Deer from "../../../assets/deer.png";
import Gourd from "../../../assets/gourd.png";
import Rooster from "../../../assets/rooster.png";
import Fish from "../../../assets/fish.png";
import Crab from "../../../assets/crab.png";
import Shrimp from "../../../assets/shrimp.png";

function Board(props){
  return (
    <div className="game-board-container">
      <div className="game-choose">
        <div className="animals">
          <div id="button-container" className="button-container">
            <button id="deer" onClick={!props.ready ? props.amount : null} value="deer">
              <img id="deer"className="animal-img" src={Deer} alt="deer"/></button>
            <button id="bau" onClick={!props.ready ? props.amount : null} value="bau">
              <img id="bau" className="animal-img" src={Gourd} alt="gourd"/></button>
            <button id="chicken" onClick={!props.ready ? props.amount : null} value="chicken">
              <img id="chicken" className="animal-img" src={Rooster} alt="rooster"/></button>
            <button id="fish" onClick={!props.ready ? props.amount : null} value="fish">
              <img id="fish" className="animal-img" src={Fish} alt="fish"/></button>
            <button id="crab" onClick={!props.ready ? props.amount : null} value="crab">
              <img id="crab" className="animal-img" src={Crab} alt="crab"/></button>
            <button id="shrimp" onClick={!props.ready ? props.amount : null} value="shrimp">
              <img id="shrimp" className="animal-img" src={Shrimp} alt="shrimp"/></button>
          </div>
        </div>
      </div>
      {props.showBet.show ? 
      <div className="game-bet">
        <div className="bet-options">
          <div className="bet-animal">
            <p> BET: {props.showBet.animal.toUpperCase()} </p>
            <p>${props.total}</p>
          </div>
          <div className="plus-or-minus">
            <button id="plus-button" className="plus-button" onClick={props.betting}>+</button>
            <button id="minus-button" className="minus-button" onClick={props.betting}>-</button>
          </div>
        </div>
        <div className="bet-buttons">
          <button value={1} onClick={props.bet}>1</button>
          <button value={5} onClick={props.bet}>5</button>
          <button value={10} onClick={props.bet}>10</button>
          <button value={20} onClick={props.bet}>20</button>
          <button value={50} onClick={props.bet}>50</button>
          <button value={100} onClick={props.bet}>100</button>
        </div>
      </div> 
      : null}
    </div>
  )
}

export default Board;