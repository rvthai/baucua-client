import React from "react";
import "./Header.css";

// Components
import Die from "components/Game/Die/Die";
import Die2 from "components/Game/Die/Die2";
function Header(props) {
  return (
    <div className="main-header-container">
      <div className="game-time">
        <p>Round 1</p>
      </div>
      <div className="game-dice">
        <Die />
        <Die />
        <Die />
      </div>
    </div>
  );
}

export default Header;
