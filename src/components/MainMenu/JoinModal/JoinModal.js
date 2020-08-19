import React, { useState, useContext } from "react";
import SocketContext from "contexts/socket-context";
import "./JoinModal.css";

// Fontawesome Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDoorOpen } from "@fortawesome/free-solid-svg-icons";

function JoinModal(props) {
  const socket = useContext(SocketContext);

  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  const onChangeName = (event) => {
    setName(event.target.value);
  };

  const onChangeRoom = (event) => {
    setRoom(event.target.value);
  };

  const handleJoinClick = () => {
    var name_input = document.getElementById("name-input");
    var room_input = document.getElementById("room-input");

    if (name !== "" && room !== "") {
      socket.emit("check", room, (error, message) => {
        if (error) {
          props.onInvalidCode(message);
        } else {
          socket.emit("join", { name, room }, (error) => {
            if (error) {
              console.log(error);
            } else {
              props.onJoinClick();
            }
          });
        }
      });
    }

    if (name === "") {
      name_input.classList.remove("join-modal-input");
      name_input.classList.add("join-modal-input-error");
    } else {
      name_input.classList.remove("join-modal-input-error");
      name_input.classList.add("join-modal-input");
    }

    if (room === "") {
      room_input.classList.remove("join-modal-input");
      room_input.classList.add("join-modal-input-error");
    } else {
      room_input.classList.remove("join-modal-input-error");
      room_input.classList.add("join-modal-input");
    }
  };

  const onKeyUp = (event) => {
    if (event.key === "Enter") {
      handleJoinClick();
    }
  };

  // const handleJoinClick = () => {
  //   if (checkInputs()) {
  //     socket.emit("join", { name, room }, (error) => {
  //       if (error) {
  //         console.log(error);
  //       } else {
  //         props.onJoinClick();
  //       }
  //     });
  //   }
  // };

  return (
    <div className="join-modal">
      <FontAwesomeIcon
        style={{ color: "#353535" }}
        icon={faDoorOpen}
        size="4x"
      />
      <p className="join-modal-title">Join a room.</p>
      <input
        id="name-input"
        type="text"
        className="join-modal-input"
        placeholder="Enter your name"
        onKeyUp={onKeyUp}
        onChange={onChangeName}
        maxLength="12"
        autoComplete="off"
      />
      <input
        id="room-input"
        type="text"
        style={{ marginTop: "1rem" }}
        className="join-modal-input"
        placeholder="Enter room code"
        onKeyUp={onKeyUp}
        onChange={onChangeRoom}
        maxLength="6"
        autoComplete="off"
      />
      <div className="join-modal-btns">
        <button className="join-modal-cancel-btn" onClick={props.onCancelClick}>
          Cancel
        </button>
        <button className="join-modal-join-btn" onClick={handleJoinClick}>
          Join
        </button>
      </div>
    </div>
  );
}

export default JoinModal;

// delete everything below this later
// class JoinModal extends Component {
//   checkRoomCode = () => {
//     this.socket.emit("check", this.state.room, (error, message) => {
//       if (error) {
//         this.props.onInvalidCode(message);
//       } else {
//         this.setState({ redirect: true });
//       }
//     });
//   };

//   checkInputs = (event) => {
//     event.preventDefault();

//     var name_input = document.getElementById("name-input");
//     var room_input = document.getElementById("room-input");

//     if (this.state.name !== "" && this.state.room !== "") {
//       this.checkRoomCode();
//     }

//     if (this.state.name === "") {
//       name_input.classList.remove("join-modal-input");
//       name_input.classList.add("join-modal-input-error");
//     } else {
//       name_input.classList.remove("join-modal-input-error");
//       name_input.classList.add("join-modal-input");
//     }

//     if (this.state.room === "") {
//       room_input.classList.remove("join-modal-input");
//       room_input.classList.add("join-modal-input-error");
//     } else {
//       room_input.classList.remove("join-modal-input-error");
//       room_input.classList.add("join-modal-input");
//     }
//   };

//   onKeyUp = (event) => {
//     if (event.key === "Enter") {
//       event.persist();
//       this.checkInputs(event);
//     }
//   };

//   render() {
//     if (this.state.redirect) {
//       return (
//         <Redirect
//           to={{
//             pathname: `/${this.state.room}`,
//             state: {
//               name: this.state.name,
//               newRoom: false,
//             },
//           }}
//         />
//       );
//     }

//     return (
//       <div className="join-modal">
//         <FontAwesomeIcon
//           style={{ color: "#353535" }}
//           icon={faDoorOpen}
//           size="4x"
//         />
//         <p className="join-modal-title">Join a room.</p>
//         <input
//           id="name-input"
//           className="join-modal-input"
//           placeholder="Enter your name"
//           type="text"
//           onKeyUp={this.onKeyUp}
//           onChange={this.onChangeName}
//           maxLength="12"
//           autoComplete="off"
//         />
//         <input
//           id="room-input"
//           className="join-modal-input"
//           style={{ marginTop: "1rem" }}
//           placeholder="Enter room code"
//           type="text"
//           onKeyUp={this.onKeyUp}
//           onChange={this.onChangeRoom}
//           maxLength="6"
//           autoComplete="off"
//         />
//         <div className="join-modal-btns">
//           <button
//             className="join-modal-cancel-btn"
//             onClick={this.props.onCancelClick}
//           >
//             Cancel
//           </button>
//           <Link
//             onClick={this.checkInputs}
//             to={{
//               pathname: `/${this.state.room}`,
//               state: {
//                 name: this.state.name,
//                 newRoom: false,
//               },
//             }}
//           >
//             <button className="join-modal-join-btn">Join</button>
//           </Link>
//         </div>
//       </div>
//     );
//   }
// }

// export default JoinModal;
