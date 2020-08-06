import React from "react";
import ScrollToBottom from "react-scroll-to-bottom";

import "./Chatbox.css";

function Chatbox(props){
  const chat = props.chat;
  const message = [];
  for (let i = 0; i < chat.length; ++i){
    message.push(
      <div key={i+"cool"}className={i % 2 === 0 ? "message": "alternate"}>
        <p className="message-content">{chat[i].name}: {chat[i].message}</p>
      </div>)
  }
  return(
  <ScrollToBottom className="scroll-chat">
    {message}
  </ScrollToBottom>
  )}

export default Chatbox;