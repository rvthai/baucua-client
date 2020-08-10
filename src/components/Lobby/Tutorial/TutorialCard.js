import React, { Component } from "react";
import "./TutorialCard.css";

// Fontawesome Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class TutorialCard extends Component {
  render() {
    return (
      <div className="tutorial-card">
        <FontAwesomeIcon
          className="tutorial-card-icon"
          icon={this.props.icon}
          size="4x"
        />
        <p className="tutorial-card-instruction">{this.props.instruction}</p>
        <p className="tutorial-card-description">{this.props.description}</p>
      </div>
    );
  }
}

export default TutorialCard;
