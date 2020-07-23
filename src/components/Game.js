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
      <button onClick={bet} value="deer">Deer</button>
      <button onClick={bet} value="bau">Bau</button>
      <button onClick={bet} value="chicken">Chicken</button>
      <button onClick={bet} value="fish">Fish</button>
      <button onClick={bet} value="crab">Crab</button>
      <button onClick={bet} value="shrimp">Shrimp</button>
      {props.host ? <button onClick={roll}>Roll</button> : null}
      <Link to="/"><button>leave</button></Link>
    </div>

  )
}


export default Game;