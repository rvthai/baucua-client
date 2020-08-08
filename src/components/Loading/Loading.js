import React from "react";
import "./Loading.css";

function Loading(){
  return (
    <div className="lds-container">
       <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}

export default Loading;