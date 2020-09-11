import React, { useState, useEffect } from "react";
import "./Dashboard.css";

// Images - Dollars
import OneDollar from "assets/money/one-dollar.png";
import FiveDollar from "assets/money/five-dollar.png";
import TenDollar from "assets/money/ten-dollar.png";
import TwentyDollar from "assets/money/twenty-dollar.png";
import FiftyDollar from "assets/money/fifty-dollar.png";
import HundredDollar from "assets/money/hundred-dollar.png";

// Images - Disabled Dollars
import OneDollarDisabled from "assets/money/one-dollar-disabled.png";
import FiveDollarDisabled from "assets/money/five-dollar-disabled.png";
import TenDollarDisabled from "assets/money/ten-dollar-disabled.png";
import TwentyDollarDisabled from "assets/money/twenty-dollar-disabled.png";
import FiftyDollarDisabled from "assets/money/fifty-dollar-disabled.png";
import HundredDollarDisabled from "assets/money/hundred-dollar-disabled.png";

function Dashboard(props) {
  // useEffect - check and handle which dollars are available in real time
  useEffect(() => {
    const player = props.gamestate.players.filter((p) => props.id === p.id)[0];

    var dollars = document.getElementsByClassName("dollar");
    for (let i = 0; i < dollars.length; i++) {
      var dollar = document.getElementById(dollars[i].id + "-disabled");
      if (player.total < parseInt(dollars[i].id)) {
        dollars[i].style.display = "none";
        dollars[i].classList.remove("dollar-active");
        dollar.style.display = "inline-block";
      } else {
        dollars[i].style.display = "inline-block";
        dollar.style.display = "none";
      }
    }

    var bet_btn = document.getElementById("bet-btn");
    if (player.bankrupt) {
      bet_btn.classList.add("bet-btn-disabled");
    }
  }, [props.gamestate]);

  // useEffect - If the player is ready, prevent the dashboard from being clickable
  useEffect(() => {
    var dashboard = document.getElementById("dashboard");
    var bet_btn = document.getElementById("bet-btn");

    if (props.ready) {
      var dollars = document.getElementsByClassName("dollar-active");
      if (dollars.length > 0) {
        dollars[0].classList.remove("dollar-active");
      }
      dashboard.style.zIndex = -1;
    } else {
      dashboard.style.zIndex = 0;
      bet_btn.classList.remove("bet-btn-active");
    }
  }, [props.ready]);

  const handleDollarClick = (event) => {
    var dollars = document.getElementsByClassName("dollar-active");
    if (dollars.length > 0) {
      dollars[0].classList.remove("dollar-active");
    }

    var dollar = document.getElementById(event.target.id);
    dollar.classList.add("dollar-active");

    props.handleBetting(parseInt(event.target.id));
  };

  const handleBetClick = () => {
    var bet_btn = document.getElementById("bet-btn");
    var dollars = document.getElementsByClassName("dollar-active");

    if (dollars.length > 0) {
      dollars[0].classList.remove("dollar-active");
    }

    bet_btn.classList.add("bet-btn-active");
    props.handleReady(true);
  };

  return (
    <div id="dashboard" className="dashboard-container">
      <div className="dollars">
        <img
          id="1"
          className="dollar"
          src={OneDollar}
          onClick={handleDollarClick}
        />
        <img
          id="5"
          className="dollar"
          src={FiveDollar}
          onClick={handleDollarClick}
        />
        <img
          id="10"
          className="dollar"
          src={TenDollar}
          onClick={handleDollarClick}
        />
        <img
          id="20"
          className="dollar"
          src={TwentyDollar}
          onClick={handleDollarClick}
        />
        <img
          id="50"
          className="dollar"
          src={FiftyDollar}
          onClick={handleDollarClick}
        />
        <img
          id="100"
          className="dollar"
          src={HundredDollar}
          onClick={handleDollarClick}
        />

        <img
          id="1-disabled"
          className="dollar-disabled"
          src={OneDollarDisabled}
        />
        <img
          id="5-disabled"
          className="dollar-disabled"
          src={FiveDollarDisabled}
        />
        <img
          id="10-disabled"
          className="dollar-disabled"
          src={TenDollarDisabled}
        />
        <img
          id="20-disabled"
          className="dollar-disabled"
          src={TwentyDollarDisabled}
        />
        <img
          id="50-disabled"
          className="dollar-disabled"
          src={FiftyDollarDisabled}
        />
        <img
          id="100-disabled"
          className="dollar-disabled"
          src={HundredDollarDisabled}
        />
      </div>

      <button id="bet-btn" className="bet-btn" onClick={handleBetClick}>
        BET
      </button>
    </div>
  );
}

export default Dashboard;
