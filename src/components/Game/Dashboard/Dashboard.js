import React, { useEffect } from "react";
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

// Images - Dollars (Mobile)
import OneDollarVert from "assets/money/one-dollar-vert.png";
import FiveDollarVert from "assets/money/five-dollar-vert.png";
import TenDollarVert from "assets/money/ten-dollar-vert.png";
import TwentyDollarVert from "assets/money/twenty-dollar-vert.png";
import FiftyDollarVert from "assets/money/fifty-dollar-vert.png";
import HundredDollarVert from "assets/money/hundred-dollar-vert.png";

// Images - Disabled Dollars (Mobile)
import OneDollarDisabledVert from "assets/money/one-dollar-disabled-vert.png";
import FiveDollarDisabledVert from "assets/money/five-dollar-disabled-vert.png";
import TenDollarDisabledVert from "assets/money/ten-dollar-disabled-vert.png";
import TwentyDollarDisabledVert from "assets/money/twenty-dollar-disabled-vert.png";
import FiftyDollarDisabledVert from "assets/money/fifty-dollar-disabled-vert.png";
import HundredDollarDisabledVert from "assets/money/hundred-dollar-disabled-vert.png";

function Dashboard(props) {
  // useEffect - check and handle which dollars are available in real time
  useEffect(() => {
    const player = props.gamestate.players.filter((p) => props.id === p.id)[0];

    var dollars = document.getElementsByClassName("dollar");

    for (let i = 0; i < dollars.length; i++) {
      var dollar1 = document.getElementById(dollars[i].id + "-disabled-vert");

      var dollar2 = document.getElementById(dollars[i].id + "-disabled");

      if (player.total < parseInt(dollars[i].id)) {
        dollars[i].style.display = "none";
        dollars[i].classList.remove("dollar-active");
        dollar1.style.display = "inline-block";
        dollar2.style.display = "inline-block";
      } else {
        dollars[i].style.display = "inline-block";
        dollar1.style.display = "none";
        dollar2.style.display = "none";
      }
    }

    var bet_btn = document.getElementById("bet-btn");
    if (player.bankrupt) {
      bet_btn.classList.add("bet-btn-disabled");
    }
  }, [props.gamestate, props.id, window.innerWidth]);

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
      <div className="dashboard-content">
        <div className="dollars">
          <img
            id="1"
            className="dollar"
            src={OneDollar}
            alt="one-dollar"
            onClick={handleDollarClick}
          />
          <img
            id="5"
            className="dollar"
            src={FiveDollar}
            alt="five-dollar"
            onClick={handleDollarClick}
          />
          <img
            id="10"
            className="dollar"
            src={TenDollar}
            alt="ten-dollar"
            onClick={handleDollarClick}
          />
          <img
            id="20"
            className="dollar"
            src={TwentyDollar}
            alt="twenty-dollar"
            onClick={handleDollarClick}
          />
          <img
            id="50"
            className="dollar"
            src={FiftyDollar}
            alt="fifty-dollar"
            onClick={handleDollarClick}
          />
          <img
            id="100"
            className="dollar"
            src={HundredDollar}
            alt="hundred-dollar"
            onClick={handleDollarClick}
          />

          <img
            id="1-disabled"
            className="dollar-disabled"
            src={OneDollarDisabled}
            alt="one-dollar-disabled"
          />
          <img
            id="5-disabled"
            className="dollar-disabled"
            src={FiveDollarDisabled}
            alt="five-dollar-disabled"
          />
          <img
            id="10-disabled"
            className="dollar-disabled"
            src={TenDollarDisabled}
            alt="ten-dollar-disabled"
          />
          <img
            id="20-disabled"
            className="dollar-disabled"
            src={TwentyDollarDisabled}
            alt="twenty-dollar-disabled"
          />
          <img
            id="50-disabled"
            className="dollar-disabled"
            src={FiftyDollarDisabled}
            alt="fifty-dollar-disabled"
          />
          <img
            id="100-disabled"
            className="dollar-disabled"
            src={HundredDollarDisabled}
            alt="hundred-dollar-disabled"
          />
        </div>

        {/* Mobile */}
        <div className="dollars-mobile">
          <img
            id="1"
            className="dollar"
            src={OneDollarVert}
            alt="one-dollar"
            onClick={handleDollarClick}
          />
          <img
            id="5"
            className="dollar"
            src={FiveDollarVert}
            alt="five-dollar"
            onClick={handleDollarClick}
          />
          <img
            id="10"
            className="dollar"
            src={TenDollarVert}
            alt="ten-dollar"
            onClick={handleDollarClick}
          />
          <img
            id="20"
            className="dollar"
            src={TwentyDollarVert}
            alt="twenty-dollar"
            onClick={handleDollarClick}
          />
          <img
            id="50"
            className="dollar"
            src={FiftyDollarVert}
            alt="fifty-dollar"
            onClick={handleDollarClick}
          />
          <img
            id="100"
            className="dollar"
            src={HundredDollarVert}
            alt="hundred-dollar"
            onClick={handleDollarClick}
          />

          <img
            id="1-disabled-vert"
            className="dollar-disabled"
            src={OneDollarDisabledVert}
            alt="one-dollar-disabled"
          />
          <img
            id="5-disabled-vert"
            className="dollar-disabled"
            src={FiveDollarDisabledVert}
            alt="five-dollar-disabled"
          />
          <img
            id="10-disabled-vert"
            className="dollar-disabled"
            src={TenDollarDisabledVert}
            alt="ten-dollar-disabled"
          />
          <img
            id="20-disabled-vert"
            className="dollar-disabled"
            src={TwentyDollarDisabledVert}
            alt="twenty-dollar-disabled"
          />
          <img
            id="50-disabled-vert"
            className="dollar-disabled"
            src={FiftyDollarDisabledVert}
            alt="fifty-dollar-disabled"
          />
          <img
            id="100-disabled-vert"
            className="dollar-disabled"
            src={HundredDollarDisabledVert}
            alt="hundred-dollar-disabled"
          />
        </div>

        <button id="bet-btn" className="bet-btn" onClick={handleBetClick}>
          BET
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
