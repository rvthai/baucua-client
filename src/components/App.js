import React from "react";
import io from "socket.io-client";
import "../stylesheets/App.css";

function App() {
  let socket = io("http://localhost:9000");

  return (
    <div className="home-container">
      <p className="game-title">Bau Cua Ca Cop</p>
      <button className="btn">Host</button>
      <button className="btn">Join</button>
    </div>
  );
}

export default App;
