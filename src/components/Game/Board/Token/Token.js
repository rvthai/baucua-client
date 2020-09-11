import React, { useContext } from "react";
import SocketContext from "contexts/socket-context";
import "./Token.css";

// Fontawesome Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle } from "@fortawesome/free-solid-svg-icons";

function Token(props) {
  const socket = useContext(SocketContext);

  const handleClearClick = (event) => {
    event.stopPropagation(); // Prevents this event from be passed up as a bet action

    socket.emit("unbet", {
      id: props.id,
      amount: props.amount,
      animal: props.animal,
    });
  };

  // Clicking on token does not target parent div id
  // This functions handles that by passing the symbol up
  const handleTokenClick = (event) => {
    event.stopPropagation(); // Prevents this event from be passed up as a bet action
    props.onTokenClick(props.animal);
  };

  // Only players themselves can see the remove option for their bets
  var remove_option = null;
  if (props.id === socket.id) {
    remove_option = (
      <FontAwesomeIcon
        id="minus-icon"
        icon={faMinusCircle}
        onClick={handleClearClick}
      />
    );
  }

  return (
    <div
      className="token"
      style={{ backgroundColor: props.color }}
      onClick={handleTokenClick}
    >
      ${props.amount}
      {remove_option}
    </div>
  );
}

export default Token;
