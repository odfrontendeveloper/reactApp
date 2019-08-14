import React, { Component } from "react";
import { Redirect, Link } from 'react-router-dom';
import LogButton from './LogButton/LogButton.js';

class LoginForm extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      login: false
    }
    this.loginUser = this.loginUser.bind(this);
    this.authUser = this.authUser.bind(this);
  }

  authUser(mail){
    this.setState({login: mail});
  }

  loginUser(e){
    e.preventDefault();
    let mail = document.querySelector('#email-address').value;
    let regexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(regexp.test(mail)){
      document.querySelector('#res-validate').innerText = '';
      this.authUser(mail);
      localStorage.setItem('mail', mail);
    }
    else {
      document.querySelector('#res-validate').innerText = 'Incorrect email!';
    }
  }

  render(){
    if(this.state.login == false){
      return(
        <div className="form-block">
          <form name="log-form" id="log-form" onSubmit={this.loginUser}>
            <div className="image-conteiner">
              <img src="/dist/img/user.png"/>
            </div>
            <div>
              <input type="text" id="email-address"/><br/>
              <span id="res-validate"></span>
            </div>
            <div className="button-conteiner">
              <LogButton
                click={
                  () => {
                    this.loginUser(document.querySelector('#email-address').value)
                  }
                }
              />
            </div>
          </form>
        </div>
      );
    }
    else {
        return(
          <Redirect to="/home"/>
        );
    }
  }

}

export default LoginForm;
