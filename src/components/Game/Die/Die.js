import React, { useState } from "react";
import "./Die.css";
// Images
import Deer from "../../../assets/symbols/deer.png";
import Gourd from "../../../assets/symbols/gourd.png";
import Rooster from "../../../assets/symbols/rooster.png";
import Fish from "../../../assets/symbols/fish.png";
import Crab from "../../../assets/symbols/crab.png";
import Shrimp from "../../../assets/symbols/shrimp.png";

function Die(props) {
  const [symbol, setSymbol] = useState(Crab);

  const handleRoll = () => {
    var d = document.getElementsByClassName("die");
    var pics = document.getElementsByClassName("die-img");
    for (let i = 0; i < d.length; i++) {
      d[i].classList.toggle("die-roll");
      d[i].style.backgroundImage =
        "url(" + require("../../../assets/symbols/crab.png") + ")";
    }
  };

  return (
    <div id="d" onClick={handleRoll} className="die">
      <img src={""} id="sym" className="die-img" />
    </div>
  );
}

export default Die;
