import React, {Component} from 'react';
import style from './style.module.css';
import axios from "axios";
import Chatkit from "@pusher/chatkit-client";
import Spinner from "react-spinkit";
import {CHATKIT_INSTANCE_LOCATOR} from '../../constants';

export default class ChatController extends Component {

  state = {
    chatAction: null,
    userName: '',
    chatRoom: '',
    isLoading: false,
    messages: [],
  };

  handleChangeChatAction = chatAction => {
    this.setState({chatAction});
  };

  handleChangeUserName = e => {
    this.setState({userName: e.target.value});
  };

  handleChangeChatRoom = e => {
    this.setState({chatRoom: e.target.value});
  };

  connectToRoom = (id) => {
    const { appData } = this.props;

    return appData.user
      .subscribeToRoom({
        roomId: `${id}`,
        messageLimit: 100,
        hooks: {
          onMessage: message => {
            this.setState({
              messages: [...this.state.messages, message]
            });
          },
        }
      })
      .then(currentRoom => {
        appData.setRoom(currentRoom);
      });
  }

  createRoom = () => {
    const {appData} = this.props;

    appData.user
      .createRoom({
        name: this.state.chatRoom,
        private: true
      })
      .then(room => this.connectToRoom(room.id))
      // .then(() => this.addSupportStaffToRoom())
      .catch(console.error);
  };

  handleSubmitNewChat = () => {
    this.setState({isLoading: true});
    const {userName} = this.state;

    if (userName === null || userName.trim() === "") {
      alert("Invalid userId");
    } else {
      axios
        .post("http://localhost:5200/users", { userId: userName })
        .then(() => {
          const tokenProvider = new Chatkit.TokenProvider({
            url: "http://localhost:5200/authenticate"
          });

          const chatManager = new Chatkit.ChatManager({
            instanceLocator: CHATKIT_INSTANCE_LOCATOR,
            userId: userName,
            tokenProvider
          });

          return chatManager.connect().then(currentUser => {
            this.props.appData.setUser(currentUser);
            this.setState({isLoading: false},
              () => this.createRoom()
            );
          });
        })
        .catch(console.error);
    }
  };

  handleSubmitJoinChat = () => {

  };

  render() {
    const {appData} = this.props;
    const {chatAction, isLoading, userName, chatRoom, messages} = this.state;
    console.log('APP DATA: ', appData);
    console.log('MESSAGES:', messages);

    if (isLoading) {
      return (
        <div className={style.btnsWrapper}>
          <Spinner name="ball-triangle-path" color="#f0f0f0" />
        </div>
      )
    }

    return (
      <>
        {chatAction === null && (
          <div className={style.btnsWrapper}>
              <button type="button" className="btn btn-primary" style={{width: 200}} onClick={this.handleChangeChatAction.bind(this, 'join')}>
                Join chat
              </button>
              <button type="button" className="btn btn-info" style={{width: 200}} onClick={this.handleChangeChatAction.bind(this, 'new')}>
                Create new chat
              </button>
          </div>
        )}

        {chatAction === 'new' && (
          <div className={style.btnsWrapper}>
            <h4>NEW CHAT</h4>
            <div className="form-group" style={{width: 350}}>
              <label htmlFor="userName">Nickname</label>
              <input onChange={this.handleChangeUserName} value={userName} type="text" className="form-control" id="exampleInputEmail1" placeholder="Nickname" />
            </div>
            <div className="form-group" style={{width: 350}}>
              <label htmlFor="chatName">Char room name</label>
              <input onChange={this.handleChangeChatRoom} value={chatRoom} type="text" className="form-control" id="exampleInputEmail1" placeholder="chatroom" />
            </div>
            <button type="button" className="btn btn-success" style={{width: 350}} onClick={this.handleSubmitNewChat}>
              CREATE CHAT
            </button>
            <button type="button" className="btn btn-primary" style={{width: 200, marginTop: 30}} onClick={this.handleChangeChatAction.bind(this, null)}>
              BACK
            </button>
          </div>
        )}

        {chatAction === 'join' && (
          <div className={style.btnsWrapper}>
            <h4>JOIN CHAT</h4>
            <div className="form-group" style={{width: 350}}>
              <label htmlFor="userName">Nickname</label>
              <input onChange={this.handleChangeUserName} value={userName} type="text" className="form-control" id="exampleInputEmail1" placeholder="Your Name" />
            </div>
            <div className="form-group" style={{width: 350}}>
              <label htmlFor="chatName">Char room name</label>
              <input onChange={this.handleChangeChatRoom} value={chatRoom} type="text" className="form-control" id="exampleInputEmail1" placeholder="chatroom" />
            </div>
            <button type="button" className="btn btn-success" style={{width: 350}}>
              JOIN CHAT
            </button>
            <button type="button" className="btn btn-primary" style={{width: 200, marginTop: 30}} onClick={this.handleChangeChatAction.bind(this, null)}>
              BACK
            </button>
          </div>
        )}
      </>
      
    );
  }

}