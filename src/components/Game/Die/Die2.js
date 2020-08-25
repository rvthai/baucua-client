import React from "react";
import "./Die2.css";
// Images
import Deer from "../../../assets/symbols/deer.png";
import Gourd from "../../../assets/symbols/gourd.png";
import Rooster from "../../../assets/symbols/rooster.png";
import Fish from "../../../assets/symbols/fish.png";
import Crab from "../../../assets/symbols/crab.png";
import Shrimp from "../../../assets/symbols/shrimp.png";

function Die2(props) {
  return (
    <div>
      <ol className="die-list" data-roll="1" id="die">
        <li className="die-item" data-side="1"></li>
        <li className="die-item" data-side="2"></li>
        <li className="die-item" data-side="3"></li>
        <li className="die-item" data-side="4"></li>
        <li className="die-item" data-side="5"></li>
        <li className="die-item" data-side="6"></li>
      </ol>
    </div>
  );
}

export default Die2;
