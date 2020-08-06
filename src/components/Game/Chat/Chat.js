import React from "react";
import Chatbox from "./Chatbox/Chatbox";
import "./Chat.css";

function Chat(props){
  return(
    <div className="game-chat-container">
      <div className="chat-messages">
        <Chatbox chat={props.chat}/>
      </div>
      <div className="chat-input">
        <input 
          autoComplete="off" 
          placeholder="Type your message here"  
          id="message" 
          type="text" 
          onKeyUp={props.onKeyUp}/>
      </div>
    </div>
  )

}

export default Chat;