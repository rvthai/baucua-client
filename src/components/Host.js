import React, {Component} from "react";
import {Link} from "react-router-dom";

class Host extends Component{
  constructor(){
    super();
    this.state = {
      name: "",
      room: Math.random().toString(36).substring(7),
    }
  }
  
  onChangeName = (event) => {
    this.setState({
      name: event.target.value,
    })
  }
  
  render(){
    return(
      <div>
          <p>Host</p>
          <input placeholder="Name" type="text" onChange={this.onChangeName}/>
          <Link to={{
            pathname: `/lobby/${this.state.room}`,
            state: {
              name: this.state.name,
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

export default Host;