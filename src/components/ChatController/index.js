import React, {Component} from 'react';
import style from './style.module.css';
import PropTypes from 'prop-types';
import axios from "axios";
import Chatkit from "@pusher/chatkit-client";
import Spinner from "react-spinkit";
import {CHATKIT_INSTANCE_LOCATOR, DEFAULT_CHAT_USER, ENDPOINT} from '../../constants';
import AddToChatForm from '../AddToChatForm';
import ChatRoom from '../ChatRoom';
import {NEW_CHAT_TYPE, JOIN_CHAT_TYPE} from './constants';

export default class ChatController extends Component {

  static propTypes = {
    appData: PropTypes.object.isRequired,
  };

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
      .get(`${ENDPOINT}/posts`, { userId: 'support' })
      .then(() => {
        const tokenProvider = new Chatkit.TokenProvider({
          url: `${ENDPOINT}/authenticate`
      });

      const chatManager = new Chatkit.ChatManager({
        instanceLocator: CHATKIT_INSTANCE_LOCATOR,
        userId: DEFAULT_CHAT_USER,
        tokenProvider,
      });

      return chatManager
        .connect()
        .then(data => {
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
      userId: DEFAULT_CHAT_USER,
      roomId: appData.room.id,
    });
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
        .post(`${ENDPOINT}/users`, { userId: userName })
        .then(() => {
          const tokenProvider = new Chatkit.TokenProvider({
            url: `${ENDPOINT}/authenticate`
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
    const {userName} = this.state;

    axios
      .post(`${ENDPOINT}/users`, { userId: userName })
      .then(() => {
        const tokenProvider = new Chatkit.TokenProvider({
          url: `${ENDPOINT}/authenticate`
      });

      const chatManager = new Chatkit.ChatManager({
        instanceLocator: CHATKIT_INSTANCE_LOCATOR,
        userId: userName,
        tokenProvider
      });

      return chatManager
        .connect()
        .then(currentUser => {
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

  handleSubmitMessage = () => {
    // event.preventDefault();
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

    let bodyComponent = null;
    if (isLoading) {
      bodyComponent = <Spinner name="ball-triangle-path" color="#f0f0f0" />;
    } else {
      if (chatAction === null) {
        bodyComponent = (
          <>
            <button type="button" className="btn btn-primary" style={{width: 200}} onClick={this.handleChangeChatAction.bind(this, JOIN_CHAT_TYPE)}>
              Join chat
            </button>
            <button type="button" className="btn btn-info" style={{width: 200}} onClick={this.handleChangeChatAction.bind(this, NEW_CHAT_TYPE)}>
              Create new chat
            </button>
          </>
        )
      } else {
        bodyComponent = (
          <AddToChatForm
            onBackClick={this.handleChangeChatAction.bind(this, null)}
            onChatroomChange={this.handleChangeChatRoom}
            onNicknameChange={this.handleChangeUserName}
            chatroom={chatRoom}
            nickname={userName}
            title={chatAction === NEW_CHAT_TYPE ? "CREATE NEW CHAT" : "JOIN CHAT ROOM"}
            onSubmit={chatAction === NEW_CHAT_TYPE ? this.handleSubmitNewChat : this.handleSubmitJoinChat}
            buttonLabel={chatAction === NEW_CHAT_TYPE ? 'Create' : 'Join'}
          />
        );
      }
    }

    if (isChatReady) {
      return (
        <ChatRoom
          title={appData.room !== null ? appData.room.name : ''}
          messages={messages}
          currentUserId={appData.user.id}
          newMessageValue={message}
          onAddSubmit={this.handleSubmitMessage}
          onNewMessageChange={this.handleUpdateMessage}
        />
      )
    }

    return (
      <div className={style.btnsWrapper}>
        {bodyComponent}
      </div>
    );
  }

}