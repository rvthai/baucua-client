import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import "./Host.css";

// Fontawesome Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";

class Host extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      room: Math.random().toString(36).substring(2, 8).toUpperCase(),
      rediredct: false,
    };
  }

  onChangeName = (event) => {
    this.setState({
      name: event.target.value,
    });
  };

  checkInput = (event) => {
    var e = document.getElementById("name-input");
    if (this.state.name === "") {
      event.preventDefault();
      e.style.boxShadow = "0 0 5px #CC0000";
      e.style.border = "none";
      e.style.transition = "none";
    }
  };

  onKeyUp = (event) => {
    var e = document.getElementById("name-input");
    if (event.key === "Enter") {
      if (this.state.name === "") {
        e.style.boxShadow = "0 0 5px #CC0000";
        e.style.border = "none";
        e.style.transition = "none";
      } else {
        this.setState({ redirect: true });
      }
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
              newRoom: true,
            },
          }}
        />
      );
    }

    return (
      <div className="host-modal">
        <FontAwesomeIcon
          style={{ color: "#353535" }}
          icon={faUsers}
          size="4x"
        />
        <p className="host-modal-title">Host a room.</p>
        <input
          id="name-input"
          className="host-modal-input"
          placeholder="Enter your name"
          type="text"
          onKeyUp={this.onKeyUp}
          onChange={this.onChangeName}
          maxLength="12"
          autoComplete="off"
        />
        <div className="host-modal-btns">
          <button
            className="host-modal-cancel-btn"
            onClick={this.props.onCancelClick}
          >
            Cancel
          </button>
          <Link
            onClick={this.checkInput}
            to={{
              pathname: `/${this.state.room}`,
              state: {
                name: this.state.name,
                newRoom: true,
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
