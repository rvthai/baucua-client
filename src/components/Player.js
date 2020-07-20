import React from "react";


function DisplayPlayerName(props){
  let index;
  const nameList = [];
  for (index=0; index < props.players.length; ++index){
    nameList.push(
    <h2 key={props.players[index].name+index}>
      Player:{props.players[index].name}
    </h2>
    )
  }
  return nameList;
}

export default DisplayPlayerName;