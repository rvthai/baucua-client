import React, { useState, useContext, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import "./MainMenu.css";

// Components
import HostModal from "./HostModal/HostModal";
import JoinModal from "./JoinModal/JoinModal";
import ErrorModal from "./ErrorModal/ErrorModal";

// Logo
import Logo from "assets/logo/logo.png";

function MainMenu(props) {
  const [hostModal, setHostModal] = useState(false);
  const [joinModal, setJoinModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [overlay, setOverlay] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const showHostModal = () => {
    setHostModal(true);
    setOverlay(true);
  };

  const showJoinModal = () => {
    setJoinModal(true);
    setOverlay(true);
  };

  const showErrorModal = (message) => {
    setJoinModal(false);
    setErrorModal(true);
    setErrorMessage(message);
  };

  const hideModal = () => {
    setHostModal(false);
    setJoinModal(false);
    setErrorModal(false);
    setOverlay(false);
  };

  const handleDragStart = (event) => {
    event.preventDefault();
  };

  return (
    <div className="main-menu">
      <img src={Logo} className="logo" onDragStart={handleDragStart} />
      <div className="main-menu-btns">
        <button className="main-menu-btn" onClick={showHostModal}>
          Host
        </button>
        <button className="main-menu-btn" onClick={showJoinModal}>
          Join
        </button>

        {overlay ? <div id="overlay" onClick={hideModal} /> : null}

        <CSSTransition
          in={hostModal}
          timeout={300}
          unmountOnExit
          classNames="modal"
        >
          <HostModal
            onCancelClick={hideModal}
            onHostClick={props.onRenderRoom}
            onInvalidCode={showErrorModal}
          />
        </CSSTransition>
        <CSSTransition
          in={joinModal}
          timeout={300}
          unmountOnExit
          classNames="modal"
        >
          <JoinModal
            onCancelClick={hideModal}
            onJoinClick={props.onRenderRoom}
            onInvalidCode={showErrorModal}
          />
        </CSSTransition>
        <CSSTransition
          in={errorModal}
          timeout={300}
          unmountOnExit
          classNames="modal"
        >
          <ErrorModal onCancelClick={hideModal} message={errorMessage} />
        </CSSTransition>
      </div>

      <p className="copyright">
        Developed by{" "}
        <a href="https://github.com/rvthai" target="_blank">
          Ricky Thai
        </a>{" "}
        and{" "}
        <a href="https://github.com/jackiedl" target="_blank">
          Jackie Luu
        </a>
      </p>
    </div>
  );
}

export default MainMenu;
