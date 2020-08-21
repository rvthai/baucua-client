import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import "./Dashboard.css";

// Images
import OneDollar from "assets/money/one-dollar.png";
import FiveDollar from "assets/money/five-dollar.png";
import TenDollar from "assets/money/ten-dollar.png";
import TwentyDollar from "assets/money/twenty-dollar.png";
import HundredDollar from "assets/money/hundred-dollar.png";

function Dashboard(props) {
  const [ready, setReady] = useState(false);

  const handleReadyClick = () => {
    if (!ready) {
      setReady(true);
    } else {
      setReady(false);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="money-wrapper">
        <img className="money" src={OneDollar} />
        <img className="money" src={FiveDollar} />
        <img className="money" src={TenDollar} />
        <img className="money" src={TwentyDollar} />
        <img className="money" src={HundredDollar} />
      </div>
      {!ready ? (
        <button className="ready-button2" onClick={handleReadyClick}>
          Ready
        </button>
      ) : (
        <button className="unready-button" onClick={handleReadyClick}>
          Unready
        </button>
      )}
    </div>
  );
}

export default Dashboard;
