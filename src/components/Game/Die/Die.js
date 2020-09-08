import React, { useState, useEffect, useContext } from "react";
import SocketContext from "contexts/socket-context";
import "./Die.css";
// Images
import Deer from "../../../assets/symbols/deer.png";
import Gourd from "../../../assets/symbols/gourd.png";
import Rooster from "../../../assets/symbols/rooster.png";
import Fish from "../../../assets/symbols/fish.png";
import Crab from "../../../assets/symbols/crab.png";
import Shrimp from "../../../assets/symbols/shrimp.png";

function Die(props) {
  const socket = useContext(SocketContext);
  useEffect(() => {
    socket.on("diceroll", ({ dice1, dice2, dice3 }) => {
      var dices = document.getElementsByClassName("die-roll");
      while (dices.length > 0) {
        dices[0].classList.remove("die-roll");
      }

      setTimeout(() => {
        roll1(dice1);
      }, 1000);
      setTimeout(() => {
        roll2(dice2);
      }, 2000);
      setTimeout(() => {
        roll3(dice3);
      }, 3000);
    });

    socket.on("cleardice", () => {
      clearDice();
    });
  }, []);

  const roll1 = (sym) => {
    console.log("in roll1");
    var d1 = document.getElementById("d1");
    //d1.classList.toggle("die-roll");
    d1.style.backgroundImage =
      "url(" + require("../../../assets/symbols/" + sym + ".png") + ")";
  };
  const roll2 = (sym) => {
    console.log("in roll 2");
    var d2 = document.getElementById("d2");
    //d2.classList.toggle("die-roll");
    d2.style.backgroundImage =
      "url(" + require("../../../assets/symbols/" + sym + ".png") + ")";
  };
  const roll3 = (sym) => {
    console.log("in roll 3");
    var d3 = document.getElementById("d3");
    //d3.classList.toggle("die-roll");
    d3.style.backgroundImage =
      "url(" + require("../../../assets/symbols/" + sym + ".png") + ")";
  };

  const clearDice = () => {
    var d1 = document.getElementById("d1");
    var d2 = document.getElementById("d2");
    var d3 = document.getElementById("d3");

    d1.style.backgroundImage = "none";
    d2.style.backgroundImage = "none";
    d3.style.backgroundImage = "none";
  };

  // const handleRoll = (dice) => {
  //   var d1 = document.getElementById("d1");
  //   var d2 = document.getElementById("d2");
  //   var d3 = document.getElementById("d3");
  //   d1.classList.toggle("die-roll");
  //   d1.style.backgroundImage =
  //     "url(" + require("../../../assets/symbols/" + dice[0] + ".png") + ")";
  //   d2.classList.toggle("die-roll");
  //   d2.style.backgroundImage =
  //     "url(" + require("../../../assets/symbols/" + dice[1] + ".png") + ")";
  //   d3.classList.toggle("die-roll");
  //   d3.style.backgroundImage =
  //     "url(" + require("../../../assets/symbols/" + dice[2] + ".png") + ")";
  // };

  return (
    <div className="dice-container">
      <div id="d1" className="die"></div>
      <div id="d2" className="die"></div>
      <div id="d3" className="die"></div>
    </div>
  );
}

export default Die;
