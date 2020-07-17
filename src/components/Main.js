import React, {Component} from "react";
import { Link } from "react-router-dom";
import "../stylesheets/App.css";


class Main extends Component{
  render(){
    return(
      <div className="home-container">
          <p className="game-title">Bau Cua Ca Cop</p>
          <Link to="/host">
            <button className="btn">Host</button>
          </Link>
          <button className="btn">Join</button>
      </div>
    )};
}

export default Main;