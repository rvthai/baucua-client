import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Host.css";

// Fontawesome Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faDoorClosed } from "@fortawesome/free-solid-svg-icons";

class Host extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      room: Math.random().toString(36).substring(7),
    };
  }

  onChangeName = (event) => {
    this.setState({
      name: event.target.value,
    });
  };

  render() {
    return (
      <div className="host-modal">
        <FontAwesomeIcon
          style={{ color: "#353535" }}
          icon={faUsers}
          size="4x"
        />
        <p className="host-modal-title">Host a room.</p>
        <input
          className="host-modal-input"
          placeholder="Enter your name"
          type="text"
          onChange={this.onChangeName}
        />
        <div className="host-modal-btns">
          <button
            className="host-modal-cancel-btn"
            onClick={this.props.onCancelClick}
          >
            Cancel
          </button>
          <Link
            to={{
              pathname: `/${this.state.room}`,
              state: {
                name: this.state.name,
                host: 1,
              },
            }}
          >
            <button className="host-modal-host-btn">Host</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Host;
