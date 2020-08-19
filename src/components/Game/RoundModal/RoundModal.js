import React from "react";
import { Link } from "react-router-dom";
import "./RoundModal.css";

function RoundModal(props){
  return (
    <div className="round-modal">
      {props.start !== undefined ? <p>ROUND {props.round}</p> : null}
      {props.end !== undefined ? <p>ROUND {props.round-1} END</p> : null}
      {props.gameover !== undefined 
        ? <div className="gameover-modal">
            <p>GAMEOVER</p>
            <Link to="/">
              <button>MAIN MENU</button>
            </Link> 
          </div>
        : null}
    </div>
  )
}

export default RoundModal;