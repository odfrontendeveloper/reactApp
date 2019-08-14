import React, { Component } from "react";

class DeleteItemBlock extends React.Component {

  constructor(props){
    super(props);
  }

  render(){
    return(
      <div className="delete-item-block">
        <div className="popUp">
          <input type="hidden" id="drop-post-id"/>
          <h1>Delete this post?</h1>
          <hr/>
          <div className="drop-post-name"></div>
          <form className="button-block" onSubmit={this.props.deleteItem}>
            <button type="submit">
              <img src="/dist/img/yes.png"/>
            </button>
            <button type="button" onClick={() => {this.props.closePopUp()}}>
              <img src="/dist/img/no.png"/>
            </button>
          </form>
        </div>
      </div>
    );
  }

}

export default DeleteItemBlock;
