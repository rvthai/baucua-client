import React, { useEffect } from "react";
import "./Settings.css";

// Fontawesome Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faDice,
  faMoneyBill,
} from "@fortawesome/free-solid-svg-icons";

function Settings(props) {
  useEffect(() => {
    if (!props.isHost) {
      var options = document.getElementsByClassName("select");
      for (let i = 0; i < options.length; i++) {
        options[i].classList.add("disable");
      }
    }

    // Remove the disabled options styling if host changes
    var disabled_options = document.getElementsByClassName("disable");
    if (props.isHost && disabled_options.length > 0) {
      while (disabled_options.length > 0) {
        disabled_options[0].classList.remove("disable");
      }
    }
  }, [props.isHost]);

  const onOptionChange = (event) => {
    props.onSettingsChange(event.target.id, event.target.value);
  };

  return (
    <div className="lobby-options">
      <label>
        <span className="setting-label">
          <FontAwesomeIcon icon={faClock} className="setting-icon" />
          Time:
        </span>
        <select
          id="timer"
          className="select"
          onChange={onOptionChange}
          value={props.timer}
        >
          <option value={30}>30s</option>
          <option value={60}>60s</option>
          <option value={90}>90s</option>
        </select>
      </label>

      <label>
        <span className="setting-label">
          <FontAwesomeIcon icon={faDice} className="setting-icon" />
          Rounds:
        </span>
        <select
          id="rounds"
          className="select"
          onChange={onOptionChange}
          value={props.rounds}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
          <option value={20}>20</option>
          <option value={25}>25</option>
          <option value={30}>30</option>
        </select>
      </label>

      <label>
        <span className="setting-label">
          <FontAwesomeIcon icon={faMoneyBill} className="setting-icon" />
          Balance:
        </span>
        <select
          id="balance"
          className="select"
          onChange={onOptionChange}
          value={props.balance}
        >
          <option value={10}>$10</option>
          <option value={25}>$25</option>
          <option value={50}>$50</option>
          <option value={75}>$75</option>
          <option value={100}>$100</option>
          <option value={150}>$150</option>
          <option value={200}>$200</option>
          <option value={250}>$250</option>
          <option value={500}>$500</option>
          <option value={750}>$750</option>
          <option value={1000}>$1000</option>
        </select>
      </label>
    </div>
  );
}

export default Settings;
