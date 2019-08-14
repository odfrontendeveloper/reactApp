import React, { Component } from "react";

class ItemElement extends React.Component {

  constructor(props){
    super(props);
  }

  render(){
    return(
      <div className="item-block" id={'item-' + this.props.idUpdate}>
        <div className="control-button-block">
          <button type="button" className="redact-item" value={this.props.idUpdate} onClick={() => {this.props.openDrawerUpdate(this.props.idUpdate)}}>
            <img src="/dist/img/redact.png"/>
          </button>
          <button type="button" className="delete-item" onClick={this.props.openPopUp}>
            <img src="/dist/img/delete.png"/>
          </button>
        </div>
        <h1 className={'title-' + this.props.idUpdate}>{this.props.title}</h1>
        <p className={'description-' + this.props.idUpdate}>{this.props.description}</p>
      </div>
    );
  }

}

export default ItemElement;
