import React, { Component } from "react";
import "./Tutorial.css";

// Fontawesome Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faHandPointUp,
  faCheck,
  faCubes,
  faTrophy,
} from "@fortawesome/free-solid-svg-icons";
// import { faHandPointUp } from "@fortawesome/free-regular-svg-icons";

// Components
import TutorialCard from "./TutorialCard";

class Tutorial extends Component {
  render() {
    return (
      <div className="drawer">
        <FontAwesomeIcon
          icon={faTimes}
          onClick={this.props.onCloseClick}
          className="close-icon"
        />
        <div className="drawer-header">
          <p className="drawer-title">HOW TO PLAY</p>
        </div>
        <div className="tutorial-cards">
          <TutorialCard
            icon={faHandPointUp}
            instruction="Pick your spots"
            description="Which spots are feeling lucky? Place wagers on the symbols that you think will show up on the three dice before time runs out!"
          />
          <TutorialCard
            icon={faCheck}
            instruction="Ready up"
            description='Click "Ready" when you are done. Once all bets are in, the dice roll will begin.'
          />
          <TutorialCard
            icon={faCubes}
            instruction="It's roll time"
            description="Three dice will be rolled. One match results in winnings of 1x the bet amount, two matches results in 2x, and three matches results in 3x."
          />
          <TutorialCard
            icon={faTrophy}
            instruction="Leaderboard"
            description="Aim to be the richest and luckiest player by the end of the game. If you go bankrupt, you're out!"
          />
        </div>
      </div>
    );
  }
}

export default Tutorial;
