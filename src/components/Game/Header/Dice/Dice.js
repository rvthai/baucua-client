import React, { useEffect, useContext } from "react";
import SocketContext from "contexts/socket-context";
import "./Dice.css";

function Dice() {
  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.on("diceroll", ({ die1, die2, die3 }) => {
      setTimeout(() => {
        roll1(die1);
      }, 1000);
      setTimeout(() => {
        roll2(die2);
      }, 2000);
      setTimeout(() => {
        roll3(die3);
      }, 3000);
    });

    socket.on("cleardice", () => {
      clearDice();
    });
  }, [socket]);

  const roll1 = (symbol) => {
    var die1 = document.getElementById("die1");
    if (die1 === null) return;
    die1.style.backgroundImage =
      "url(" + require("assets/symbols/" + symbol + ".png") + ")";
  };
  const roll2 = (symbol) => {
    var die2 = document.getElementById("die2");
    if (die2 === null) return;
    die2.style.backgroundImage =
      "url(" + require("assets/symbols/" + symbol + ".png") + ")";
  };
  const roll3 = (symbol) => {
    var die3 = document.getElementById("die3");
    if (die3 === null) return;
    die3.style.backgroundImage =
      "url(" + require("assets/symbols/" + symbol + ".png") + ")";
  };

  const clearDice = () => {
    var die1 = document.getElementById("die1");
    var die2 = document.getElementById("die2");
    var die3 = document.getElementById("die3");

    if (die1 === null || die2 === null || die3 === null) {
      return null;
    }

    die1.style.backgroundImage = "none";
    die2.style.backgroundImage = "none";
    die3.style.backgroundImage = "none";
  };

  return (
    <div className="dice-container">
      <div id="die1" className="die"></div>
      <div id="die2" className="die"></div>
      <div id="die3" className="die"></div>
    </div>
  );
}

export default Dice;
