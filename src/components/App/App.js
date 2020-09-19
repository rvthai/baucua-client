import React, { useEffect, useState } from "react";
import SocketContext from "contexts/socket-context";
import io from "socket.io-client";
import "./App.css";

// Components
import MainMenu from "components/MainMenu/MainMenu";
import Room from "components/Room/Room";

const ENDPOINT = "http://192.168.1.15:9000";
// const ENDPOINT = "http://localhost:9000";
const socket = io(ENDPOINT, { reconnection: false });

function App() {
  const [renderView, setRender] = useState(0);

  // Clean up socket on component unmounting
  useEffect(() => {
    return () => {
      socket.disconnect();
    };
  }, []);

  const renderMainMenu = () => {
    socket.emit("removeplayer");
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
