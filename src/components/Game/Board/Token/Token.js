import React, { useContext } from "react";
import SocketContext from "contexts/socket-context";
import "./Token.css";

// Fontawesome Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle } from "@fortawesome/free-solid-svg-icons";

function Token(props) {
  const socket = useContext(SocketContext);

  const handleClearClick = (event) => {
    event.stopPropagation();

    socket.emit("unbet", {
      id: props.id,
      amount: props.amount,
      animal: props.animal,
    });
  };

  const handleTokenClick = (event) => {
    event.stopPropagation();
    props.onTokenClick(props.animal);
  };

  var remove_option = null;
  if (props.id === socket.id) {
    remove_option = (
      <FontAwesomeIcon
        id="minus-icon"
        className="minus-icon"
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
