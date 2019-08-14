import React, { Component } from "react";
import DrawerInputTitle from './DrawerInputTitle/DrawerInputTitle.js';
import DrawerTextAreaDescription from './DrawerTextAreaDescription/DrawerTextAreaDescription.js';

class Drawer extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      title: null,
      description: null
    };
  }

  render(){
    if(this.props.formAdd){
      return(
        <form className="add-and-update-block" onSubmit={this.props.addPost}>
          <h1 id="drawer-info">Add new post</h1>
          <label htmlFor="drawer-title">Title</label>
          <input id="drawer-title" type="text"/>
          <label htmlFor="drawer-description">Description</label>
          <textarea id="drawer-description"></textarea>
          <button type="submit" id="submit-drawer">Submit</button>
          <button type="button" id="close-drawer" onClick={this.props.closeDrawer}>
            <img src="/dist/img/no.png"/>
          </button>
        </form>
      );
    }
    else {
      return(
        <form className="add-and-update-block" onSubmit={this.props.updatePost}>
          <h1 id="drawer-info">Update post</h1>
          <input type="hidden" id="update-post-id" value={this.props.idUpdate}/>
          <label htmlFor="drawer-title">Title</label>
          <DrawerInputTitle value={document.querySelector('.title-' + this.props.idUpdate).innerText}/>
          <label htmlFor="drawer-description">Description</label>
          <DrawerTextAreaDescription value={document.querySelector('.description-' + this.props.idUpdate).innerText}/>
          <button type="submit" id="submit-drawer">Submit</button>
          <button type="button" id="close-drawer" onClick={this.props.closeDrawer}>
            <img src="/dist/img/no.png"/>
          </button>
        </form>
      );
    }
  }

}

export default Drawer;
