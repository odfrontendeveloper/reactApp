import React, { Component } from "react";

class DrawerInputTitle extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      title: this.props.value
    };
    this.handleChangeTitle = this.handleChangeTitle.bind(this);
  }

  handleChangeTitle(e){
    this.setState({
      title: e.target.value
    });
  }

  render(){
    return(
      <input type="text" id="drawer-title" value={this.state.title} onChange={this.handleChangeTitle}/>
    );
  }

}

export default DrawerInputTitle;
