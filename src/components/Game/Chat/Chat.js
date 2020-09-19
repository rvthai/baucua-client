import React, { useContext, useEffect } from "react";
import SocketContext from "contexts/socket-context";
import "./Chat.css";

// Fontawesome Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faPaperPlane } from "@fortawesome/free-solid-svg-icons";

function Chat(props) {
  const socket = useContext(SocketContext);

  useEffect(() => {
    var elem = document.getElementById("chatbox");
    elem.scrollTop = elem.scrollHeight;
  }, [props.messages]);

  const onSendClick = () => {
    let input = document.getElementById("message");
    if (input.value.length > 0) {
      sendMessage();
    }
  };

  const onKeyUp = (event) => {
    if (event.target.value.length > 0 && event.key === "Enter") {
      sendMessage();
    }
  };

  const sendMessage = () => {
    const user = props.gamestate.players.find((p) => p.id === socket.id);
    if (user) {
      let input = document.getElementById("message");
      socket.emit("sendmessage", {
        id: socket.id,
        name: user.name,
        message: input.value,
      });
      input.value = "";
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header" onClick={props.onCollapseClick}>
        <p className="chat-header-title">CHAT ROOM</p>
        <FontAwesomeIcon
          className="chat-header-icon"
          icon={faAngleDown}
          onClick={props.onCollapseClick}
        />
      </div>

      <div id="chatbox" className="chat-messages">
        {props.messages.map((message, index) => (
          <p key={index} className="message">
            <span style={{ color: message.color }}>{message.name}: </span>
            {message.message}
          </p>
        ))}
      </div>

      <div className="chat-input-wrapper">
        <input
          id="message"
          className="chat-input"
          type="text"
          autoComplete="off"
          placeholder="Send a message"
          onKeyUp={onKeyUp}
        />
        <FontAwesomeIcon
          className="chat-input-icon"
          icon={faPaperPlane}
          onClick={onSendClick}
        />
      </div>
    </div>
  );
}

export default Chat;
