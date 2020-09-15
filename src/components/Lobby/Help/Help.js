import React from "react";
import "./Help.css";

// Fontawesome Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

function Help(props) {
  return (
    <div id="help" className="help-container">
      <div className="help-header">
        <p className="help-title">HOW TO PLAY</p>
        <FontAwesomeIcon
          icon={faTimes}
          onClick={props.onCloseClick}
          className="close-icon"
        />
      </div>
      <div className="help-content">
        <p>
          There is a set of three dice. Each die contains six unique symbols
          (deer, gourd, rooster, fish, crab, and shrimp). Players bet money on
          which symbol they think will appear on the dice. A match results in
          the initial bet amount plus the bet amount multiplied by the number of
          matches.
        </p>
        <p>
          For each round:
          <ol>
            <li>
              Bet on spots by clicking on the dollar amount then the preferred
              spot.
            </li>
            <li>
              Click on the "BET" button to lock in your bet before time runs
              out!{" "}
            </li>
            <li>Once all bets are in or times up, the dice will be rolled.</li>
            <li>
              Wins and losses will be calculated at the end of each round. Try
              to be at the top of the leaderboard by the end of the game!
            </li>
            <li>
              Test your luck but BECAREFUL! Once you go bankrupt, you are
              disqualified!
            </li>
          </ol>
        </p>
        <p>Good luck and have fun!</p>
      </div>
    </div>
  );
}

export default Help;
