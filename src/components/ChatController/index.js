import React, {Component} from 'react';
import style from './style.module.css';
import axios from "axios";
import Chatkit from "@pusher/chatkit-client";
import Spinner from "react-spinkit";
import {CHATKIT_INSTANCE_LOCATOR} from '../../constants';

const classes = require('react-style-classes');

export default class ChatController extends Component {

  state = {
    chatAction: null,
    chatRoom: '',
    userName: '',
    isLoading: false,
    messages: [],
    isChatReady: false,
    message: '',
    loadedRooms: [],
    roomId: null,
  };

  componentDidMount() {
    this.setState({isLoading: true});
    axios
    .get("http://localhost:5200/posts", { userId: 'support' })
    .then(() => {
      const tokenProvider = new Chatkit.TokenProvider({
        url: "http://localhost:5200/authenticate"
      });

      const chatManager = new Chatkit.ChatManager({
        instanceLocator: CHATKIT_INSTANCE_LOCATOR,
        userId: 'support',
        tokenProvider,
      });

      return chatManager
        .connect()
        .then(data => {
          console.log(data.rooms)
          this.setState({loadedRooms: data.rooms, isLoading: false});
        });
    })
    .catch(console.error);
  }

  handleChangeChatAction = chatAction => {
    this.setState({chatAction});
  };

  handleChangeUserName = e => {
    this.setState({userName: e.target.value});
  };

  handleChangeChatRoom = e => {
    this.setState({chatRoom: e.target.value});
  };

  handleUpdateMessage = e => {
    this.setState({message: e.target.value});
  };

  addSupportStaffToRoom = () => {
    const {appData} = this.props;

    return appData.user.addUserToRoom({
      userId: "support",
      roomId: appData.room.id,
    });
  };

  connectToRoom = (id) => {
    const { appData } = this.props;

    console.log(id)
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
        private: false,
      })
      .then(room => this.connectToRoom(room.id))
      .then(() => this.addSupportStaffToRoom())
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
            this.setState({isLoading: false, isChatReady: true},
              () => this.createRoom()
            );
          });
        })
        .catch(console.error);
    }
  };

  handleSubmitJoinChat = () => {
    this.setState({isLoading: true});
    const {chatRoom, userName} = this.state;

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

      return chatManager
        .connect()
        .then(currentUser => {
          console.log(currentUser)
          this.props.appData.setUser(currentUser);
          this.setState(
            {
              isLoading: false, isChatReady: true,
            },
            () => {
              const roomName = this.state.chatRoom.trim();
              const selectedRoom = this.state.loadedRooms.find(room => room.name === roomName);
          
              if (typeof selectedRoom === 'undefined') {
                alert('Room was not found');
                this.setState({isChatReady: false});
                return;
              }

              this.connectToRoom(selectedRoom.id);
            }
          );
        });
    })
    .catch(console.error);
  };

  handleSubmitMessage = (event) => {
    event.preventDefault();
    const { message } = this.state;
    const {appData} = this.props;

    if (message.trim() === "") return;

    appData.user.sendMessage({
      text: message,
      roomId: `${appData.room.id}`
    });

    this.setState({
      message: ""
    });
  };

  render() {
    const {chatAction, isLoading, chatRoom, messages, message, isChatReady, userName} = this.state;
    const {appData} = this.props;

    if (isLoading) {
      return (
        <div className={style.btnsWrapper}>
          <Spinner name="ball-triangle-path" color="#f0f0f0" />
        </div>
      )
    }

    if (isChatReady) {
      return (
        <div>
          <div className="card text-white bg-dark mt-3">
            <div className="card-header">CHAT</div>
            <div className="card-body">
              <div className={style.chatList}>
                {messages.map((message, index) => {
                  console.log(message);
                  const isMine = message.senderId === appData.user.id;
                  return (
                    <div className={classes(style.message, isMine && style.mineMessage)} key={`${message}-${index}`}>
                      {message.text}
                    </div>
                  )
                })}
              </div>
            </div>
            <div className="card-footer">
              <div className={style.sendWrapper}>
                <input placeholder="type your message..." className="form-control" onChange={this.handleUpdateMessage} value={message} />
                <button type="button" className="btn btn-success" style={{marginLeft: 10}} onClick={this.handleSubmitMessage}>
                  SUBMIT 
                </button>
              </div>
            </div>
          </div>
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
              <label htmlFor="chatName">Nickname</label>
              <input onChange={this.handleChangeUserName} value={userName} type="text" className="form-control" id="exampleInputEmail1" placeholder="Nickname" />
            </div>
            <div className="form-group" style={{width: 350}}>
              <label htmlFor="chatName">Chat room name</label>
              <input onChange={this.handleChangeChatRoom} value={chatRoom} type="text" className="form-control" id="exampleInputEmail1" placeholder="chatroom name" />
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
              <label htmlFor="chatName">Nickname</label>
              <input onChange={this.handleChangeUserName} value={userName} type="text" className="form-control" id="exampleInputEmail1" placeholder="Nickname" />
            </div>
            <div className="form-group" style={{width: 350}}>
              <label htmlFor="chatName">Chat room name</label>
              <input onChange={this.handleChangeChatRoom} value={chatRoom} type="text" className="form-control" id="exampleInputEmail1" placeholder="chatroom name" />
            </div>
            <button type="button" className="btn btn-success" style={{width: 350}} onClick={this.handleSubmitJoinChat}>
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