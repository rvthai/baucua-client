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
  const [gamestate, setGameState] = useState({});

  const ENDPOINT = "http://localhost:9000";

  useEffect(() => {
    let err = false;
    socket = io(ENDPOINT);

    socket.emit('join', {name, room, host}, (error)=>{
      if(error){
        err = true;
        alert(error);
      }
    });
    
    return () =>{
      if (!err){
        socket.emit("leaveroom", {id:socket.id, room});
      }
      socket.disconnect();
    }

    // eslint-disable-next-line
  },[ENDPOINT,name,room]);

  useEffect(() =>{
    socket.on('roomdata', ({users}) =>{
      setUsers(users);
    })

    socket.on('newhost', () => {
      setHost(true);
    })

    socket.on('gamestart', ({gamestate}) => {
      setGameState(gamestate);
      setRender(1);
    })

  }, [])

  const onClickStart = () => {
    socket.emit("startgame", ({room, players:player}));
  }

  switch(renderView){
    case 1:
      return <Game socket={socket} gamestate={gamestate} host={host}/>
    default:
      return <LobbyUI onClickStart={onClickStart} player={player} room={room} host={host}/>
  }
}
export default Lobby;