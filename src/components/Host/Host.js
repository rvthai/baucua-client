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
          size="5x"
        />
        <p className="modal-title">Host a room.</p>
        <input
          className="modal-input"
          placeholder="Enter your name"
          type="text"
          onChange={this.onChangeName}
        />
        <div className="modal-buttons">
          <button
            className="modal-cancel-button"
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
            <button className="modal-host-button">Host</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Host;
