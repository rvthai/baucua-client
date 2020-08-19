import React, { useState, useContext } from "react";
import SocketContext from "contexts/socket-context";
import "./HostModal.css";

// Fontawesome Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";

function HostModal(props) {
  const socket = useContext(SocketContext);

  const [name, setName] = useState("");
  const [room] = useState(
    Math.random().toString(36).substring(2, 8).toUpperCase()
  );

  const onChangeName = (event) => {
    setName(event.target.value);
  };

  const checkNameInput = () => {
    if (name === "") {
      var name_input = document.getElementById("name-input");
      name_input.style.boxShadow = "0 0 5px #CC0000";
      name_input.style.border = "none";
      name_input.style.transition = "none";
      return false;
    }

    return true;
  };

  const onKeyUp = (event) => {
    if (event.key === "Enter") {
      handleHostClick();
    }
  };

  const handleHostClick = () => {
    if (checkNameInput()) {
      socket.emit("host", { name, room }, (error) => {
        if (error) {
          console.log(error);
        } else {
          props.onHostClick();
        }
      });
    }
  };

  return (
    <div className="host-modal">
      <FontAwesomeIcon style={{ color: "#353535" }} icon={faUsers} size="4x" />
      <p className="host-modal-title">Host a room.</p>
      <input
        id="name-input"
        type="text"
        className="host-modal-input"
        placeholder="Enter your name"
        onKeyUp={onKeyUp}
        onChange={onChangeName}
        maxLength="12"
        autoComplete="off"
      />
      <div className="host-modal-btns">
        <button className="host-modal-cancel-btn" onClick={props.onCancelClick}>
          Cancel
        </button>
        <button className="host-modal-host-btn" onClick={handleHostClick}>
          Host
        </button>
      </div>
    </div>
  );
}

export default HostModal;
