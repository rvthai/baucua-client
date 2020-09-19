import React, { useState, useContext } from "react";
import SocketContext from "contexts/socket-context";
import "./JoinModal.css";

// Fontawesome Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDoorOpen } from "@fortawesome/free-solid-svg-icons";

function JoinModal(props) {
  const socket = useContext(SocketContext);

  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  const onChangeName = (event) => {
    setName(event.target.value);
  };

  const onChangeRoom = (event) => {
    setRoom(event.target.value);
  };

  const handleJoinClick = () => {
    var name_input = document.getElementById("name-input");
    var room_input = document.getElementById("room-input");

    // Error handling if name and room are empty
    if (name !== "" && room !== "") {
      document.body.style.overflow = "auto";
      socket.emit("check", room, (error) => {
        if (error) {
          props.onInvalidCode(error);
        } else {
          socket.emit("join", { name, room }, () => {
            props.onJoinClick();
          });
        }
      });
    }

    // Error handling if name input is empty
    if (name === "") {
      name_input.classList.remove("join-modal-input");
      name_input.classList.add("join-modal-input-error");
    } else {
      name_input.classList.remove("join-modal-input-error");
      name_input.classList.add("join-modal-input");
    }

    // Error handling if room input is empty
    if (room === "") {
      room_input.classList.remove("join-modal-input");
      room_input.classList.add("join-modal-input-error");
    } else {
      room_input.classList.remove("join-modal-input-error");
      room_input.classList.add("join-modal-input");
    }
  };

  const onKeyUp = (event) => {
    if (event.key === "Enter") {
      handleJoinClick();
    }
  };

  return (
    <div className="join-modal">
      <FontAwesomeIcon
        id="join-icon"
        style={{ color: "#353535" }}
        icon={faDoorOpen}
        size="4x"
      />
      <p className="join-modal-title">Join a room.</p>
      <input
        id="name-input"
        type="text"
        className="join-modal-input"
        placeholder="Enter your name"
        onKeyUp={onKeyUp}
        onChange={onChangeName}
        maxLength="12"
        autoComplete="off"
      />
      <input
        id="room-input"
        type="text"
        style={{ marginTop: "1rem" }}
        className="join-modal-input"
        placeholder="Enter room code"
        onKeyUp={onKeyUp}
        onChange={onChangeRoom}
        maxLength="6"
        autoComplete="off"
      />
      <div className="join-modal-btns">
        <button className="join-modal-cancel-btn" onClick={props.onCancelClick}>
          Cancel
        </button>
        <button className="join-modal-join-btn" onClick={handleJoinClick}>
          Join
        </button>
      </div>
    </div>
  );
}

export default JoinModal;
