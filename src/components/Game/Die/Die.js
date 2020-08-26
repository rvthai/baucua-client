import React, { useState, useEffect } from "react";
import "./Die.css";
// Images
import Deer from "../../../assets/symbols/deer.png";
import Gourd from "../../../assets/symbols/gourd.png";
import Rooster from "../../../assets/symbols/rooster.png";
import Fish from "../../../assets/symbols/fish.png";
import Crab from "../../../assets/symbols/crab.png";
import Shrimp from "../../../assets/symbols/shrimp.png";

function Die(props) {
  const [symbol, setSymbol] = useState(props.symbol);
  console.log(symbol);

  useEffect(() => {
    console.log("here");
    if (symbol !== undefined) {
      handleRoll(symbol);
    }
  }, [symbol]);

  const handleRoll = (sym) => {
    var d = document.getElementsByClassName("die");
    for (let i = 0; i < d.length; i++) {
      d[i].classList.toggle("die-roll");
      d[i].style.backgroundImage =
        "url(" + require("../../../assets/symbols/" + sym + ".png") + ")";
    }
  };

  return <div id="d" className="die"></div>;
}

export default Die;
