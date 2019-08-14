import React, { Component } from "react";

class DrawerTextAreaDescription extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      description: this.props.value
    };
    this.handleChangeDescription = this.handleChangeDescription.bind(this);
  }

  handleChangeDescription(e){
    this.setState({
      description: e.target.value
    });
  }

  render(){
    return(
      <textarea id="drawer-description" value={this.state.description} onChange={this.handleChangeDescription}></textarea>
    );
  }

}

export default DrawerTextAreaDescription;
