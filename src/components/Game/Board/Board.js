import React from "react";

import "./Board.css";

import Deer from "../../../assets/deer.png";
import Gourd from "../../../assets/gourd.png";
import Rooster from "../../../assets/rooster.png";
import Fish from "../../../assets/fish.png";
import Crab from "../../../assets/crab.png";
import Shrimp from "../../../assets/shrimp.png";

function Board(props) {
  return (
    <div className="game-board-container">
      <div className="spots">
        <div className="spot">
          <img id="deer" className="symbol" src={Deer} alt="deer" />
        </div>
        <div className="spot">
          <img id="bau" className="symbol" src={Gourd} alt="gourd" />
        </div>
        <div className="spot">
          <img id="chicken" className="symbol" src={Rooster} alt="rooster" />
        </div>
        <div className="spot">
          <img id="fish" className="symbol" src={Fish} alt="fish" />
        </div>
        <div className="spot">
          <img id="crab" className="symbol" src={Crab} alt="crab" />
        </div>
        <div className="spot">
          <img id="shrimp" className="symbol" src={Shrimp} alt="shrimp" />
        </div>
      </div>
      {/* <div className="game-choose">
        <div className="animals">
          <div id="button-container" className="button-container">
            <button
              id="deer"
              onClick={!props.ready ? props.amount : null}
              value="deer"
            >
              <img id="deer" className="animal-img" src={Deer} alt="deer" />
            </button>
            <button
              id="bau"
              onClick={!props.ready ? props.amount : null}
              value="bau"
            >
              <img id="bau" className="animal-img" src={Gourd} alt="gourd" />
            </button>
            <button
              id="chicken"
              onClick={!props.ready ? props.amount : null}
              value="chicken"
            >
              <img
                id="chicken"
                className="animal-img"
                src={Rooster}
                alt="rooster"
              />
            </button>
            <button
              id="fish"
              onClick={!props.ready ? props.amount : null}
              value="fish"
            >
              <img id="fish" className="animal-img" src={Fish} alt="fish" />
            </button>
            <button
              id="crab"
              onClick={!props.ready ? props.amount : null}
              value="crab"
            >
              <img id="crab" className="animal-img" src={Crab} alt="crab" />
            </button>
            <button
              id="shrimp"
              onClick={!props.ready ? props.amount : null}
              value="shrimp"
            >
              <img
                id="shrimp"
                className="animal-img"
                src={Shrimp}
                alt="shrimp"
              />
            </button>
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default Board;
