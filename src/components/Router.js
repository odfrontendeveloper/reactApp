import React from "react";
import LoginForm from './Login.js';
import Home from './Home.js';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


function BasicExample () {
    return(
      <Router>
        <Route exact path="/" component={
          LoginForm
        }/>
        <Route path="/home" component={
          Home
        }/>
        <Route path="/home/qwe" component={
          Home
        }/>
      </Router>
    );
}

export default BasicExample;
