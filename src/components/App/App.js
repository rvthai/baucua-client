import React, { useEffect, useState } from "react";
import SocketContext from "contexts/socket-context";
import io from "socket.io-client";
import "./App.css";

// Components
import MainMenu from "../MainMenu/MainMenu";
import Room from "../Room/Room";

const ENDPOINT = "http://localhost:9000";

function App() {
  // State
  const [socket, setSocket] = useState(null);
  const [renderView, setRender] = useState(0);

  // Component lifecycle
  useEffect(() => {
    setSocket(
      io(ENDPOINT, {
        reconnection: false,
      })
    );

    return () => {
      socket.disconnect();
    };
  }, []);

  const renderRoom = () => {
    setRender(1);
  };

  const renderMainMenu = () => {
    // disconnect old socket and connect a new socket
    socket.disconnect();
    setSocket(
      io(ENDPOINT, {
        reconnection: false,
      })
    );

    setRender(0);
  };

  // Render
  switch (renderView) {
    case 1:
      return (
        <SocketContext.Provider value={socket}>
          <Room onRenderMainMenu={renderMainMenu} />
        </SocketContext.Provider>
      );
    default:
      return (
        <SocketContext.Provider value={socket}>
          <MainMenu onRenderRoom={renderRoom} />
        </SocketContext.Provider>
      );
  }
}

export default App;
