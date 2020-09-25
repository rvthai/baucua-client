import React, { useEffect, useState } from "react";
import SocketContext from "contexts/socket-context";
import io from "socket.io-client";
import "./App.css";

// Components
import MainMenu from "components/MainMenu/MainMenu";
import Room from "components/Room/Room";

const DEV_ENDPOINT = "http://localhost:9000";
const PROD_ENDPOINT = "https://baucuacacop.herokuapp.com/";
const socket = io(PROD_ENDPOINT, { reconnection: false });

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
