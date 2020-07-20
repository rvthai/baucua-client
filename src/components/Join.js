import React, {Component} from "react";
import {Link} from "react-router-dom";

class Join extends Component{
  constructor(){
    super();
    this.state = {
      name: "",
      room: "",
    }
  }
  
  onChangeName = (event) => {
    this.setState({
      name: event.target.value,
    })
  }
  onChangeRoom = (event) => {
    this.setState({
      room: event.target.value,
    })
  }
  
  render(){
    return(
      <div>
          <p>Join</p>
          <input placeholder="Name" type="text" onChange={this.onChangeName}/>
          <input placeholder="Room" type="text" onChange={this.onChangeRoom}/>
          <Link to={{
            pathname: `/${this.state.room}`,
            state: {
              name: this.state.name,
              host: 0,
            }
          }}>
            <button>Start</button>
          </Link>
          <Link to="/">
            <button>Back</button>
          </Link>
      </div>
    )};
}

export default Join;