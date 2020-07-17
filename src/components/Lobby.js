import React, {Component} from "react";
import { Link } from "react-router-dom";

class Lobby extends Component{
  constructor(props){
    super(props);
    this.state = {
      socket: this.props.socket,
      name: this.props.location.state.name,
      room: this.props.match.params.roomId,
      player: [],
    }
  }

  componentDidMount(){
    this.state.socket.emit("join", this.state.name, this.state.room);
  }
  
  render(){
    return(
      <div>
          <h1>Lobby</h1>
          <h2>{this.state.name}</h2>
          <h2>{this.state.room}</h2>
          <h2>{this.state.socket.id}</h2>
          <Link to="/">
          <button>back</button>
          </Link>
      </div>
    )};
}

export default Lobby;