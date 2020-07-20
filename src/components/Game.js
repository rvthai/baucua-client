import React, { Component } from "react";

class Game extends Component{
  constructor(props){
    super(props);
    this.state = {

    }
  }
  render(){
    console.log(this.props.socket);
    return(
      <h1> Game </h1>
    )
  }
}

export default Game;