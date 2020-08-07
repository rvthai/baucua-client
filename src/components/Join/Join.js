import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import "./Join.css";
import io from "socket.io-client";

// Fontawesome Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDoorOpen } from "@fortawesome/free-solid-svg-icons";

class Join extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      room: "",
      redirect: false,
    };
  }

  componentDidMount() {
    const ENDPOINT = "http://localhost:9000";
    this.socket = io(ENDPOINT);
  }

  componentWillUnmount() {
    this.socket.disconnect();
  }

  onChangeName = (event) => {
    this.setState({
      name: event.target.value,
    });
  };

  onChangeRoom = (event) => {
    this.setState({
      room: event.target.value,
    });
  };

  checkRoomCode = () => {
    this.socket.emit("check", this.state.room, (error, message) => {
      if (error) {
        this.props.onInvalidCode(message);
      } else {
        this.setState({ redirect: true });
      }
    });
  };

  checkInputs = (event) => {
    event.preventDefault();

    var name_input = document.getElementById("name-input");
    var room_input = document.getElementById("room-input");

    if (this.state.name !== "" && this.state.room !== "") {
      this.checkRoomCode();
    }

    if (this.state.name === "") {
      name_input.classList.remove("join-modal-input");
      name_input.classList.add("join-modal-input-error");
    } else {
      name_input.classList.remove("join-modal-input-error");
      name_input.classList.add("join-modal-input");
    }

    if (this.state.room === "") {
      room_input.classList.remove("join-modal-input");
      room_input.classList.add("join-modal-input-error");
    } else {
      room_input.classList.remove("join-modal-input-error");
      room_input.classList.add("join-modal-input");
    }
  };

  onKeyUp = (event) => {
    if (event.key === "Enter") {
      event.persist();
      this.checkInputs(event);
    }
  };

  render() {
    if (this.state.redirect) {
      return (
        <Redirect
          to={{
            pathname: `/${this.state.room}`,
            state: {
              name: this.state.name,
              newRoom: false,
            },
          }}
        />
      );
    }

    return (
      <div className="join-modal">
        <FontAwesomeIcon
          style={{ color: "#353535" }}
          icon={faDoorOpen}
          size="4x"
        />
        <p className="join-modal-title">Join a room.</p>
        <input
          id="name-input"
          className="join-modal-input"
          placeholder="Enter your name"
          type="text"
          onKeyUp={this.onKeyUp}
          onChange={this.onChangeName}
          maxLength="12"
          autoComplete="off"
        />
        <input
          id="room-input"
          className="join-modal-input"
          style={{ marginTop: "1rem" }}
          placeholder="Enter room code"
          type="text"
          onKeyUp={this.onKeyUp}
          onChange={this.onChangeRoom}
          maxLength="6"
          autoComplete="off"
        />
        <div className="join-modal-btns">
          <button
            className="join-modal-cancel-btn"
            onClick={this.props.onCancelClick}
          >
            Cancel
          </button>
          <Link
            onClick={this.checkInputs}
            to={{
              pathname: `/${this.state.room}`,
              state: {
                name: this.state.name,
                newRoom: false,
              },
            }}
          >
            <button className="join-modal-join-btn">Join</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Join;
