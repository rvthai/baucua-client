import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

import Lobby from "../Lobby/Lobby";
import Main from "../Main/Main";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route
            exact
            path="/:roomId"
            render={(props) => <Lobby {...props} />}
          />
        </Switch>
      </Router>
    );
  }
}

export default App;
