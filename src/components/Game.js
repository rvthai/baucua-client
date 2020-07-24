import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom";

function Game(props){
  const [socket] = useState(props.socket);
  const [gamestate, setGamestate] = useState(props.gamestate);

  useEffect(()=>{
    socket.on("gamestate", ({gamestate}) => {
      setGamestate(gamestate);
    })
    //eslint-disable-next-line
  }, [])

  const bet = (event) =>{
    socket.emit("bet", ({room:gamestate.roomId, id:socket.id, amount:10, animal:event.target.value}));
  }
  const roll = () => {
    socket.emit("roll", ({room: gamestate.roomId}));
  }

  return(
    <div>
      {console.log(gamestate)}
      <button onClick={!props.host ? bet : null} value="deer">Deer</button>
      <button onClick={!props.host ? bet : null} value="bau">Bau</button>
      <button onClick={!props.host ? bet : null} value="chicken">Chicken</button>
      <button onClick={!props.host ? bet : null} value="fish">Fish</button>
      <button onClick={!props.host ? bet : null} value="crab">Crab</button>
      <button onClick={!props.host ? bet : null} value="shrimp">Shrimp</button>
      {props.host ? <button onClick={roll}>Roll</button> : null}
      <Link to="/"><button>leave</button></Link>
    </div>

  )
}


export default Game;