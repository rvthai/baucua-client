import React, { useEffect, useState } from "react";
import SocketContext from "contexts/socket-context";
import io from "socket.io-client";
import "./App.css";

// Components
import MainMenu from "components/MainMenu/MainMenu";
import Room from "components/Room/Room";

const ENDPOINT = "http://localhost:9000";

function App() {
  const [socket, setSocket] = useState(null);
  const [renderView, setRender] = useState(0);

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

  const renderMainMenu = () => {
    // disconnect the old socket and connect a new socket
    socket.disconnect();
    setSocket(
      io(ENDPOINT, {
        reconnection: false,
      })
    );

    setRender(0);
  };

  const renderRoom = () => {
    setRender(1);
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
