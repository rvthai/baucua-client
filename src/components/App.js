import React, {Component} from "react";
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import io from "socket.io-client";

import Host from "./Host";
import Lobby from "./Lobby";
import Main from "./Main";


const socket = io("http://localhost:9000");

class App extends Component{

  render(){
    console.log(socket);
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Main}/>
          <Route exact path="/host" component={Host}/>
          <Route exact path="/lobby/:roomId" render={(props) => <Lobby socket={socket} {...props}/>}/>
        </Switch>
      </Router>
    )}
}

export default App;
