import React, { useState, useEffect } from "react";
import "./Dashboard.css";

// Images
import OneDollar from "assets/money/one-dollar.png";
import FiveDollar from "assets/money/five-dollar.png";
import TenDollar from "assets/money/ten-dollar.png";
import TwentyDollar from "assets/money/twenty-dollar.png";
import HundredDollar from "assets/money/hundred-dollar.png";
import OneDollarDisabled from "assets/money/one-dollar-disabled.png";
import FiveDollarDisabled from "assets/money/five-dollar-disabled.png";
import TenDollarDisabled from "assets/money/ten-dollar-disabled.png";
import TwentyDollarDisabled from "assets/money/twenty-dollar-disabled.png";
import HundredDollarDisabled from "assets/money/hundred-dollar-disabled.png";

// Fontawesome Icons
// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";

import { faCheckSquare as farCheckSquare } from "@fortawesome/free-regular-svg-icons";
import {
  faCheckSquare as fasCheckSquare,
  faPager,
  faDollyFlatbed,
} from "@fortawesome/free-solid-svg-icons";

library.add(farCheckSquare);
library.add(fasCheckSquare);

function Dashboard(props) {
  useEffect(() => {
    var player = props.gamestate.players.filter((p) => props.id === p.id);
    player = player[0];

    var dollars = document.getElementsByClassName("money");
    for (let i = 0; i < dollars.length; i++) {
      var dollar = document.getElementById(dollars[i].id + "-disabled");
      if (player.total < parseInt(dollars[i].id)) {
        dollars[i].style.display = "none";
        dollars[i].classList.remove("active-dollar");
        dollar.style.display = "inline-block";
      } else {
        dollars[i].style.display = "inline-block";
        dollar.style.display = "none";
      }
    }
  }, [props.gamestate]);

  useEffect(() => {
    var dash = document.getElementById("dashboard");
    var r = document.getElementById("rdy-btn");
    if (props.ready) {
      var dollars = document.getElementsByClassName("active-dollar");
      if (dollars.length > 0) {
        dollars[0].classList.remove("active-dollar");
      }
      dash.style.zIndex = -1;
    } else {
      dash.style.zIndex = 0;
      r.classList.remove("active-bet");
    }
  }, [props.ready]);

  const handleBetClick = () => {
    var r = document.getElementById("rdy-btn");
    var dollars = document.getElementsByClassName("active-dollar");
    if (dollars.length > 0) {
      dollars[0].classList.remove("active-dollar");
    }

    r.classList.add("active-bet");
    props.handleBet();
  };

  const handleDollarClick = (event) => {
    var dollars = document.getElementsByClassName("active-dollar");
    if (dollars.length > 0) {
      dollars[0].classList.remove("active-dollar");
    }

    var dollar = document.getElementById(event.target.id);
    dollar.classList.add("active-dollar");

    if (dollar.style.display === "none") {
      props.handleBetting(parseInt(0));
    } else {
      props.handleBetting(parseInt(event.target.id));
    }
  };

  return (
    <div id="dashboard" className="dashboard-container">
      <div className="money-wrapper">
        <img
          id="1"
          className="money"
          src={OneDollar}
          onClick={handleDollarClick}
        />
        <img
          id="5"
          className="money"
          src={FiveDollar}
          onClick={handleDollarClick}
        />
        <img
          id="10"
          className="money"
          src={TenDollar}
          onClick={handleDollarClick}
        />
        <img
          id="20"
          className="money"
          src={TwentyDollar}
          onClick={handleDollarClick}
        />
        <img
          id="100"
          className="money"
          src={HundredDollar}
          onClick={handleDollarClick}
        />
        <img
          id="1-disabled"
          className="money-disabled"
          src={OneDollarDisabled}
        />
        <img
          id="5-disabled"
          className="money-disabled"
          src={FiveDollarDisabled}
        />
        <img
          id="10-disabled"
          className="money-disabled"
          src={TenDollarDisabled}
        />
        <img
          id="20-disabled"
          className="money-disabled"
          src={TwentyDollarDisabled}
        />
        <img
          id="100-disabled"
          className="money-disabled"
          src={HundredDollarDisabled}
        />
      </div>

      <button id="rdy-btn" className="ready-button" onClick={handleBetClick}>
        BET
      </button>
    </div>
  );
}

export default Dashboard;
