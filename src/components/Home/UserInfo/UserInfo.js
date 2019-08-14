import React, { Component } from "react";

class UserInfo extends React.Component {

  constructor(props){
    super(props);
  }

  render(){
    return(
      <span id="user-email-info">
        &#x3c;{localStorage.getItem('mail')}&#x3e;
      </span>
    );
  }

}

export default UserInfo;
