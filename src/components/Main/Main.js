import React, { Component } from "react";
import { CSSTransition } from "react-transition-group";
import "./Main.css";

// Components
import Host from "../Host/Host";
import Join from "../Join/Join";

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
      showOverlay: false,
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

  hideModal = () => {
    document.getElementById("host-button").classList.remove("active");
    document.getElementById("join-button").classList.remove("active");
    this.setState({
      showHostModal: false,
      showJoinModal: false,
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
            <Join onCancelClick={this.hideModal} />
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
