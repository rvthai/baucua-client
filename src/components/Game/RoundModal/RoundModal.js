import React from "react";
import "./RoundModal.css";

function RoundModal(props){
  return (
    <div className="round-modal">
      {props.start !== undefined ? <p>ROUND {props.round}</p> : null}
      {props.end !== undefined ? <p>ROUND {props.round-1} END</p> : null}
      {props.gameover !== undefined 
        ? <div className="gameover-modal">
            <p>GAMEOVER</p>
            <button onClick={props.return}>MAIN MENU</button>
          </div>
        : null}
    </div>
  )
}

export default RoundModal;