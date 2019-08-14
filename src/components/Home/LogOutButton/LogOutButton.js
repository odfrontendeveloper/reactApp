import React, { Component } from "react";

class LogOutButton extends React.Component {

  constructor(props){
    super(props);
  }

  render(){
    return(
      <button className="logOutButton">
        <span id="logOutButtonText">Log out</span>
        <img src="/dist/img/logout.png"/>
      </button>
    );
  }

}

export default LogOutButton;
