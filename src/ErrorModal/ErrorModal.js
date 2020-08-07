import React, { Component } from "react";
import "./ErrorModal.css";

// Fontawesome Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFrown } from "@fortawesome/free-solid-svg-icons";

class ErrorModal extends Component {
  render() {
    return (
      <div className="error-modal">
        <FontAwesomeIcon
          style={{ color: "#353535" }}
          icon={faFrown}
          size="4x"
        />
        <p className="error-modal-title">Oops!</p>
        <p className="error-modal-desc">{this.props.message}</p>
        <div className="error-modal-btns">
          <button
            className="error-modal-try-again-btn"
            onClick={this.props.onCancelClick}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }
}

export default ErrorModal;
