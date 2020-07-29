import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Join.css";

// Fontawesome Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus, faDoorOpen } from "@fortawesome/free-solid-svg-icons";

class Join extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      room: "",
    };
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

  render() {
    return (
      <div className="join-modal">
        <FontAwesomeIcon
          style={{ color: "#353535" }}
          icon={faDoorOpen}
          size="4x"
        />
        <p className="join-modal-title">Join a room.</p>
        <input
          className="join-modal-input"
          placeholder="Enter your name"
          type="text"
          onChange={this.onChangeName}
        />
        <input
          className="join-modal-input"
          style={{ marginTop: "1rem" }}
          placeholder="Enter room code"
          type="text"
          onChange={this.onChangeRoom}
        />
        <div className="join-modal-btns">
          <button
            className="join-modal-cancel-btn"
            onClick={this.props.onCancelClick}
          >
            Cancel
          </button>
          <Link
            to={{
              pathname: `/${this.state.room}`,
              state: {
                name: this.state.name,
                host: 0,
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
