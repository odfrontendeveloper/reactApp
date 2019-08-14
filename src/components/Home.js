import React, { Component } from "react";
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/App.scss';

const CancelToken = axios.CancelToken;
const source = CancelToken.source();
var cancel;

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

class Drawer extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      title: null,
      description: null
    };
  }

  render(){
    //alert('Меня вызвали! Мои данные: режим - ' + this.props.formAdd + '. ID = ' + this.props.idUpdate);
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

class Home extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      isAuth: localStorage.mail != undefined ? true : false,
      posts: Array(0),
      formAdd: 1,
      idUpdateItem: null
    };
    // this.componentDidMount = this.componentDidMount.bind(this);
    this.logOut = this.logOut.bind(this);
    this.closePopUp = this.closePopUp.bind(this);
    this.openDrawerAdd = this.openDrawerAdd.bind(this);
    this.closeDrawer = this.closeDrawer.bind(this);
    this.addPost = this.addPost.bind(this);
    this.updatePost = this.updatePost.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.clickOutside = this.clickOutside.bind(this);
    document.onclick = (event) => {
      let element = event.target;
      let list = this.clickOutside(element);
      let final = list.some(function(el){
        return el == 'add-and-update-block';
      });
      let final2 = list.some(function(el){
        return el == 'popUp';
      });
      let drawer = document.querySelector('.add-and-update-block');
      if(!final && getComputedStyle(drawer).left == '0px'){
        this.closeDrawer();
      }
      else if(!final2 && getComputedStyle(document.querySelector('.delete-item-block')).display == 'flex'){
        this.closePopUp();
      }
      // alert(getComputedStyle(document.querySelector('.popUp')).display);
    };
    // this.updatePostsList();
  }

  logOut(e){
    e.preventDefault();
    delete localStorage.mail;
    this.setState({isAuth: false});
  }

  updatePostsList(){
    axios({
      method: 'get',
      url: 'https://raysael.herokuapp.com/todo?author=' + localStorage['mail']
    },{
      cancelToken: new CancelToken(function executor(c) {
        cancel = c;
      })
    }).catch(function(error){
      alert('Произошла ошибка');
    }).then((responce) => {
      this.setState({posts: responce.data})
    });
  }

  openPopUp(id){
    setTimeout(function(){
      document.querySelector('.drop-post-name').innerText = document.querySelector('.title-' + id).innerText;
      document.querySelector('#drop-post-id').value = id;
      document.querySelector('.delete-item-block').style.display = "flex";
      document.querySelector('.overlay').style.display = "block";
    }, 10);
  }

  closePopUp(){
    document.querySelector('.overlay').style.display = "none";
    document.querySelector('.delete-item-block').style.display = "none";
  }

  deleteItem(e){
    e.preventDefault();
    let id = document.querySelector('#drop-post-id').value;
    axios({
      method: 'delete',
      url: 'https://raysael.herokuapp.com/todo/' + id
    }).catch(function(error){
      alert('Произошла ошибка');
    }).then((responce) => {
      // this.updatePostsList();
      let postsList = this.state.posts;
      let sliceElement = null;
      postsList.forEach((post, i, mass) => {
        console.log(i);
        if(post._id == id) {
          sliceElement = i;
        }
      });
      if(sliceElement != null) {
        delete postsList[sliceElement];
      }
      this.setState({
        posts: postsList
      });
      this.closePopUp();
    });
  }

  disabledFunctinalButtons(){
    document.querySelector('#add-item').disabled = true;
    document.querySelector('#close-drawer').disabled = true;
    document.querySelectorAll('.redact-item').forEach(function(el){
      el.disabled = true;
    });
    setTimeout(function () {
      document.querySelector('#add-item').disabled = false;
      document.querySelector('#close-drawer').disabled = false;
      document.querySelectorAll('.redact-item').forEach(function(el){
        el.disabled = false;
      });
    }, 550);
  }

  addPost(e){
      e.preventDefault();
      let objAddPost = {
        title: document.querySelector('#drawer-title').value,
        description: document.querySelector('#drawer-description').value,
        author: localStorage.mail
      };
      for(let varibles in objAddPost) {
        if(objAddPost[varibles] == ''){
          alert('Заполните все поля!');
          return false;
        }
      }
        axios.post('https://raysael.herokuapp.com/todo', {
          author : objAddPost.author,
          title : objAddPost.title,
          description : objAddPost.description
        }).catch(function(error){
          alert('Произошла ошибка');
        }).then((responce) => {
          this.closeDrawer();
          if(responce.status == '201' || responce.status == '200'){
            document.querySelector('#drawer-title').value = null;
            document.querySelector('#drawer-description').value = null;
            let postsList = this.state.posts;
            postsList.push(responce.data);
            this.setState({
              posts: postsList
            });
            // this.updatePostsList();
            this.closeDrawer();
          }
        });
  }

  updatePost(e){
    e.preventDefault();
    let objUpdPost = {
      id: document.querySelector('#update-post-id').value,
      title: document.querySelector('#drawer-title').value,
      description: document.querySelector('#drawer-description').value
    };
    for(let varibles in objUpdPost) {
      if(objUpdPost[varibles] == ''){
        alert('Заполните все поля!');
        return false;
      }
    }
    axios({
      method: 'patch',
      url: 'https://raysael.herokuapp.com/todo/' + objUpdPost.id,
      data: {
        title: objUpdPost.title,
        description: objUpdPost.description
      }
    }).catch(function(error){
      alert('Произошла ошибка');
    }).then((responce) => {
      document.querySelector('#update-post-id').value = null;
      document.querySelector('#drawer-title').value = null;
      document.querySelector('#drawer-description').value = null;
      this.closeDrawer();
      if(responce.status == '201' || responce.status == '200'){
        this.closeDrawer();
        let postsList = this.state.posts;
        postsList.forEach((post, i, mass) => {
          if(post._id == objUpdPost.id) {
            postsList[i] = responce.data;
          }
        });
        this.setState({
          posts: postsList
        });
      }
    });
  }

  openDrawerAdd(){
    this.setState({formAdd: true});
    // alert(this.state.formAdd);
    if(document.querySelector('#add-item').disabled == false){
      // this.disabledFunctinalButtons();
      let drawer = document.querySelector('.add-and-update-block');
      if(getComputedStyle(drawer).left == '-400px' || getComputedStyle(drawer).left == '-320px') {
        document.querySelector('.overlay').style.display = "block";
        drawer.style.left = '0px';
      }
    }
  }

  openDrawerUpdate(identify){
    if(this.state.formAdd == true){
      this.setState(
        {
          formAdd: false,
          idUpdateItem: identify
        }
      );
      document.querySelector('.overlay').style.display = "block";
      if(document.querySelector('.redact-item').disabled == false){
        let drawer = document.querySelector('.add-and-update-block');
        if(getComputedStyle(drawer).left == '-' + getComputedStyle(drawer).width) {
          drawer.style.left = '0px';
        }
      }
    }
  }

  clickOutside(el){
      let parentsClassList = Array(0);
      if(el.className){
        parentsClassList.push(el.className);
      }
      function giveMe(element) {
        if(element.className){
          parentsClassList.push(element.className);
        }
        if (element.parentElement) {
          return giveMe(element.parentElement);
        }
        return false;
      }
      giveMe(el);
      return parentsClassList;
  }

  closeDrawer(){
    if(document.querySelector('#add-item').disabled == false){
      let drawer = document.querySelector('.add-and-update-block');
      if(getComputedStyle(drawer).left == '0px') {
        // alert(1);
        document.querySelector('.overlay').style.display = "none";
        this.setState(
          {
            formAdd: true,
            idUpdateItem: null
          }
        );
        drawer.style.left = '-' + getComputedStyle(drawer).width;
      }
    }
  }

  componentDidMount(){
    this.updatePostsList();
  }

  componentWillUnmount(){
    cancel();
  }

  render(){
    if(this.state.isAuth) {
      return(
      <div className="main-block-content">
        <div className="overlay"></div>
        <Drawer
          formAdd={this.state.formAdd}
          addPost={this.addPost}
          updatePost={this.updatePost}
          closeDrawer={this.closeDrawer}
          idUpdate = {this.state.idUpdateItem}
        />
        <DeleteItemBlock
          closePopUp={() => {this.closePopUp()}}
          deleteItem={this.deleteItem}
        />
        <div className="head-home">
          <UserInfo/>
          <form onSubmit={this.logOut}>
            <LogOutButton click={this.logOut}/>
          </form>
        </div>
        <div className="list-of-items">
          <div className="items">
          {this.state.posts.map((post) => {
            return(
              <ItemElement
                key={post._id}
                title={post.title}
                description={post.description}
                openPopUp={() => {this.openPopUp(post._id)}}
                openDrawerUpdate = {() => {this.openDrawerUpdate(post._id)}}
                idUpdate = {post._id}
              />
            );
          })}
          </div>
        </div>
        <button type="button" id="add-item" onClick={this.openDrawerAdd}>
          <img src="/dist/img/add.png"/>
        </button>
      </div>
      );
    }
    else {
      return(
        <Redirect to="/"/>
      );
    }
  }
}

export default Home;
