import React, { Component } from "react";
import { CSSTransition } from "react-transition-group";
import "./Main.css";

// Components
import Host from "../Host/Host";
import Join from "../Join/Join";

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
      <div className="main-container">
        <div className="header">
          <p className="game-title" lang="vi">
            BẦU CUA CÁ CỌP
          </p>
          <p className="game-description">
            A Traditional Vietnamese New Year Board Game
          </p>
        </div>

        <div className="main-buttons">
          <button
            id="host-button"
            className="main-button"
            onClick={this.showHostModal}
          >
            HOST
          </button>
          <button
            id="join-button"
            className="main-button"
            onClick={this.showJoinModal}
          >
            JOIN
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
          <button className="main-button-2">HOW TO PLAY</button>
        </div>
      </div>
    );
  }
}

export default Main;
