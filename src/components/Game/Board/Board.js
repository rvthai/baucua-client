import React, { useEffect } from "react";
import "./Board.css";

// Images
import Deer from "assets/symbols/deer.png";
import Gourd from "assets/symbols/gourd.png";
import Rooster from "assets/symbols/rooster.png";
import Fish from "assets/symbols/fish.png";
import Crab from "assets/symbols/crab.png";
import Shrimp from "assets/symbols/shrimp.png";

// Components
import Token from "./Token/Token";

function Board(props) {
  useEffect(() => {
    var board = document.getElementById("board");

    // If the player is ready, prevent the board from being clickable
    if (props.ready) {
      board.style.zIndex = -1;
    } else {
      board.style.zIndex = 0;
    }
  }, [props.ready]);

  const onSpotClick = (event) => {
    props.handleBet(event.target.id);
  };

  // Clicking on token does not target parent div id
  // This functions handles that by passing the symbol up
  const onTokenClick = (symbol) => {
    props.handleBet(symbol);
  };

  const handleDragStart = (event) => {
    event.preventDefault();
  };

  return (
    <div id="board" className="board-container">
      <div id="deer" className="spot" onClick={onSpotClick}>
        <img
          onDragStart={handleDragStart}
          id="deer"
          className="symbol"
          src={Deer}
          alt="deer"
        />
        <div id="deer" className="bets">
          {props.bets.map((bet, index) => {
            var token = null;
            if (bet.animal === "deer") {
              token = (
                <Token
                  key={index}
                  id={bet.id}
                  color={bet.color}
                  amount={bet.amount}
                  animal={bet.animal}
                  onTokenClick={onTokenClick}
                />
              );
            }
            return token;
          })}
        </div>
      </div>

      <div id="gourd" className="spot" onClick={onSpotClick}>
        <img
          onDragStart={handleDragStart}
          id="gourd"
          className="symbol"
          src={Gourd}
          alt="gourd"
        />
        <div id="gourd" className="bets">
          {props.bets.map((bet, index) => {
            var token = null;
            if (bet.animal === "gourd") {
              token = (
                <Token
                  key={index}
                  id={bet.id}
                  color={bet.color}
                  amount={bet.amount}
                  animal={bet.animal}
                  onTokenClick={onTokenClick}
                />
              );
            }
            return token;
          })}
        </div>
      </div>

      <div id="rooster" className="spot" onClick={onSpotClick}>
        <img
          onDragStart={handleDragStart}
          id="rooster"
          className="symbol"
          src={Rooster}
          alt="rooster"
        />
        <div id="rooster" className="bets">
          {props.bets.map((bet, index) => {
            var token = null;
            if (bet.animal === "rooster") {
              token = (
                <Token
                  key={index}
                  id={bet.id}
                  color={bet.color}
                  amount={bet.amount}
                  animal={bet.animal}
                  onTokenClick={onTokenClick}
                />
              );
            }
            return token;
          })}
        </div>
      </div>

      <div id="fish" className="spot" onClick={onSpotClick}>
        <img
          onDragStart={handleDragStart}
          id="fish"
          className="symbol"
          src={Fish}
          alt="fish"
        />
        <div id="fish" className="bets">
          {props.bets.map((bet, index) => {
            var token = null;
            if (bet.animal === "fish") {
              token = (
                <Token
                  key={index}
                  id={bet.id}
                  color={bet.color}
                  amount={bet.amount}
                  animal={bet.animal}
                  onTokenClick={onTokenClick}
                />
              );
            }
            return token;
          })}
        </div>
      </div>

      <div id="crab" className="spot" onClick={onSpotClick}>
        <img
          onDragStart={handleDragStart}
          id="crab"
          className="symbol"
          src={Crab}
          alt="crab"
        />
        <div id="crab" className="bets">
          {props.bets.map((bet, index) => {
            var token = null;
            if (bet.animal === "crab") {
              token = (
                <Token
                  key={index}
                  id={bet.id}
                  color={bet.color}
                  amount={bet.amount}
                  animal={bet.animal}
                  onTokenClick={onTokenClick}
                />
              );
            }
            return token;
          })}
        </div>
      </div>

      <div id="shrimp" className="spot" onClick={onSpotClick}>
        <img
          onDragStart={handleDragStart}
          id="shrimp"
          className="symbol"
          src={Shrimp}
          alt="shrimp"
        />
        <div id="shrimp" className="bets">
          {props.bets.map((bet, index) => {
            var token = null;
            if (bet.animal === "shrimp") {
              token = (
                <Token
                  key={index}
                  id={bet.id}
                  color={bet.color}
                  amount={bet.amount}
                  animal={bet.animal}
                  onTokenClick={onTokenClick}
                />
              );
            }
            return token;
          })}
        </div>
      </div>
    </div>
  );
}

export default Board;
