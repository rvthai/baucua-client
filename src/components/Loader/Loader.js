import React from "react";
import "./Loader.css";

function Loader() {
  return (
    <div className="loader-wrapper">
      <div id="die">
        <div className="side front"></div>
        <div className="side front inner"></div>
        <div className="side top"></div>
        <div className="side top inner"></div>
        <div className="side right"></div>
        <div className="side right inner"></div>
        <div className="side left"></div>
        <div className="side left inner"></div>
        <div className="side bottom"></div>
        <div className="side bottom inner"></div>
        <div className="side back"></div>
        <div className="side back inner"></div>
        <div className="side cover x"></div>
        <div className="side cover y"></div>
        <div className="side cover z"></div>
      </div>
    </div>
  );
}

export default Loader;
