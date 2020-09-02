import React, { useState, useEffect } from "react";
import "./Dashboard.css";

// Images
import OneDollar from "assets/money/one-dollar.png";
import FiveDollar from "assets/money/five-dollar.png";
import TenDollar from "assets/money/ten-dollar.png";
import TwentyDollar from "assets/money/twenty-dollar.png";
import HundredDollar from "assets/money/hundred-dollar.png";

// Fontawesome Icons
// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";

import { faCheckSquare as farCheckSquare } from "@fortawesome/free-regular-svg-icons";
import { faCheckSquare as fasCheckSquare } from "@fortawesome/free-solid-svg-icons";

library.add(farCheckSquare);
library.add(fasCheckSquare);

function Dashboard(props) {
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

    props.handleBetting(parseInt(event.target.id));
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
      </div>

      <button id="rdy-btn" className="ready-button" onClick={handleBetClick}>
        BET
      </button>
    </div>
  );
}

export default Dashboard;
