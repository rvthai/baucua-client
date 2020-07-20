import React, {useState, useEffect} from "react";
import LobbyUI from './LobbyUI';
import Game from "./Game";

import io from "socket.io-client";

let socket;

function Lobby(props){
  const [renderView, setRender] = useState(0);
  const [name] = useState(props.location.state.name);
  const [room] = useState(props.match.params.roomId);
  const [host, setHost] = useState((props.location.state.host=== 1) ? true: false);
  const [player, setUsers] = useState([]);

  const ENDPOINT = "http://localhost:9000";

  useEffect(() => {

    socket = io(ENDPOINT);

    socket.emit('join', {name, room, host}, (error)=>{
      if(error){
        alert(error);
      }
    });
    
    // eslint-disable-next-line
  },[ENDPOINT,name,room]);

  useEffect(() =>{
    socket.on('roomdata', ({users}) =>{
      setUsers(users);
    })

    socket.on('newhost', () => {
      setHost(true);
    })

    socket.on('gamestart', () => {
      setRender(1);
    })

  }, [])

  const onClickBack = () => {
    socket.emit("leaveroom", {id:socket.id, room});
    socket.disconnect();
  }

  const onClickStart = () => {
    socket.emit("startgame", ({room}));
  }

  switch(renderView){
    case 1:
      return <Game socket={socket}/>
    default:
      return <LobbyUI onClickStart={onClickStart} onClickBack={onClickBack} player={player} room={room} host={host}/>
  }
  
}


export default Lobby;