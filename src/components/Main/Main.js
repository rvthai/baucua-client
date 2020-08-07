import React, { Component } from "react";
import { CSSTransition } from "react-transition-group";
import "./Main.css";

// Components
import Host from "../Host/Host";
import Join from "../Join/Join";
import ErrorModal from "../../ErrorModal/ErrorModal";

// Fontawesome Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInfoCircle,
  faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons";

// Images
import Logo from "../../assets/logo.png";

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showHostModal: false,
      showJoinModal: false,
      showErrorModal: false,
      showOverlay: false,
      errorMessage: "",
    };
  }

  showHostModal = (event) => {
    document.getElementById(event.target.id).classList.add("active");
    this.setState({ showHostModal: true, showOverlay: true });
  };

  showJoinModal = (event) => {
    document.getElementById(event.target.id).classList.add("active");
    this.setState({ showJoinModal: true, showOverlay: true });
  };

  showErrorModal = (message) => {
    this.setState({
      showHostModal: false,
      showJoinModal: false,
      showErrorModal: true,
      errorMessage: message,
    });
  };

  hideModal = () => {
    this.setState({
      showHostModal: false,
      showJoinModal: false,
      showErrorModal: false,
      showOverlay: false,
    });
  };

  render() {
    return (
      <div className="main-menu">
        <img src={Logo} className="logo" />
        <div className="main-menu-btns">
          <button
            id="host-button"
            className="main-menu-btn"
            onClick={this.showHostModal}
          >
            Host
          </button>
          <button
            id="join-button"
            className="main-menu-btn"
            onClick={this.showJoinModal}
          >
            Join
          </button>
          {this.state.showOverlay ? (
            <div id="overlay" onClick={this.hideModal} />
          ) : null}
          <CSSTransition
            in={this.state.showHostModal}
            timeout={300}
            unmountOnExit
            classNames="modal"
          >
            <Host onCancelClick={this.hideModal} />
          </CSSTransition>
          <CSSTransition
            in={this.state.showJoinModal}
            timeout={300}
            unmountOnExit
            classNames="modal"
          >
            <Join
              onCancelClick={this.hideModal}
              onInvalidCode={this.showErrorModal}
            />
          </CSSTransition>
          <CSSTransition
            in={this.state.showErrorModal}
            timeout={300}
            unmountOnExit
            classNames="modal"
          >
            <ErrorModal
              onCancelClick={this.hideModal}
              message={this.state.errorMessage}
            />
          </CSSTransition>
        </div>
        <FontAwesomeIcon
          className="help-btn"
          icon={faQuestionCircle}
          size="3x"
        />
        <p className="copyright">© 2020 The Lazy Developers</p>
      </div>
    );
  }
}

export default Main;
