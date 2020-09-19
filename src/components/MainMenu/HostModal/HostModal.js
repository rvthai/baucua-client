import React, { useState, useContext } from "react";
import SocketContext from "contexts/socket-context";
import "./HostModal.css";

// FontAwesome Icons
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
      name_input.classList.remove("host-modal-input");
      name_input.classList.add("host-modal-input-error");
      return false;
    }

    return true;
  };

  const handleHostClick = () => {
    if (checkNameInput()) {
      document.body.style.overflow = "auto";
      socket.emit("host", { name, room }, (error) => {
        if (error) {
          props.onInvalidCode(error);
        } else {
          props.onHostClick();
        }
      });
    }
  };

  const onKeyUp = (event) => {
    if (event.key === "Enter") {
      handleHostClick();
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
