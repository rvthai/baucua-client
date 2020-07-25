import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom";

function Game(props){
  const [socket] = useState(props.socket);
  const [gamestate, setGamestate] = useState(props.gamestate);
  const [showAmount, setShowAmount] = useState({animal:null,show:false});

  useEffect(()=>{
    socket.on("gamestate", ({gamestate}) => {
      setGamestate(gamestate);
    })

    socket.on("roll", () => {
      setShowAmount({animal:null, show: false});
    })

    //eslint-disable-next-line
  }, [])

  const amount = (event) => {
    setShowAmount({animal:event.target.value, show:true});
  }

  const bet = (event) =>{
    socket.emit("bet", ({room:gamestate.roomId, id:socket.id, amount:parseInt(event.target.value), animal:showAmount.animal}));
  }
  const roll = () => {
    socket.emit("roll", ({room: gamestate.roomId}));
  }

  return(
    <div>
      {console.log(gamestate)}
      <button onClick={!props.host ? amount : null} value="deer">Deer</button>
      <button onClick={!props.host ? amount : null} value="bau">Bau</button>
      <button onClick={!props.host ? amount : null} value="chicken">Chicken</button>
      <button onClick={!props.host ? amount : null} value="fish">Fish</button>
      <button onClick={!props.host ? amount : null} value="crab">Crab</button>
      <button onClick={!props.host ? amount : null} value="shrimp">Shrimp</button>
      {props.host ? <button onClick={roll}>Roll</button> : null}
      <Link to="/"><button>leave</button></Link>
      {showAmount.show 
        ?<div>
          <h1>{showAmount.animal}</h1>
          <button onClick={bet} value={1}>1</button>
          <button onClick={bet} value={5}>5</button>
          <button onClick={bet} value={10}>10</button>
          <button onClick={bet} value={20}>20</button>
          <button onClick={bet} value={50}>50</button>
          <button onClick={bet} value={100}>100</button>
        </div>
        : null}
    </div>

  )
}


export default Game;