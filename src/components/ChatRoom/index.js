import React from 'react';
import style from './style.module.css';
import PropTypes from 'prop-types';
import Message from '../Message';
import Spinner from "react-spinkit";

const ChatRoom = ({...props}) => {
  if (props.title.length === 0) {
    return (
      <div className={style.loaderWrapper}>
        <Spinner name="ball-triangle-path" color="#f0f0f0" />
      </div>
    );
  }

  return (
    <div className="card text-white bg-dark mt-3">
      <div className="card-header">
        <span className={style.title}>{props.title}</span>
      </div>
      <div className="card-body">
        <div className={style.chatList}>
          {props.messages.map(message => {

            const isMine = message.senderId === props.currentUserId;
            return (
              <Message
                isMine={isMine}
                message={message.text}
                key={message.id}
                author={message.senderId}
                createdAt={message.createdAt}
              />
            )
          })}
        </div>
      </div>
      <div className="card-footer">
        <div className={style.sendWrapper}>
          <input
            placeholder="type your message..."
            className="form-control"
            onChange={props.onNewMessageChange}
            value={props.newMessageValue}
          />
          <button
            type="button"
            className="btn btn-success"
            style={{marginLeft: 10}}
            onClick={props.onAddSubmit}
          >
            SUBMIT 
          </button>
        </div>
      </div>
    </div>
  );
};

ChatRoom.propTypes = {
  messages: PropTypes.array.isRequired,
  currentUserId: PropTypes.string.isRequired,
  newMessageValue: PropTypes.string.isRequired,
  onAddSubmit: PropTypes.func.isRequired,
  onNewMessageChange: PropTypes.func.isRequired,
};

export default ChatRoom;