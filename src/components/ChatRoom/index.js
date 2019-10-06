import React, {useRef} from 'react';
import style from './style.module.css';
import PropTypes from 'prop-types';
import Message from '../Message';
import Spinner from "react-spinkit";

const ChatRoom = ({...props}) => {
  const lastRef = useRef(null);
  if (props.title.length === 0) {
    return (
      <div className={style.loaderWrapper}>
        <Spinner name="ball-triangle-path" color="#f0f0f0" />
      </div>
    );
  }

  const submit = (e) => {
    props.onAddSubmit(e);
    if (lastRef !== null) {
      setTimeout(() => {
        lastRef.current.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    }
  };

  const leaveChat = () => {
    // eslint-disable-next-line no-restricted-globals
    if(confirm("Do you really want to do this?")) {
      window.location.reload();
    }
    return false;
  };

  return (
    <div className="card text-white bg-dark mt-3">
      <div className="card-header" style={{display: 'flex', flex: 1, justifyContent: 'space-between'}}>
        <span className={style.title}>{props.title}</span>
        <button className="btn btn-sm btn-danger" onClick={leaveChat}>
          Leave chat
        </button>
      </div>
      <div className="card-body">
        <div className={style.chatList}>
          {props.messages.map(message => {
            const isMine = message.senderId === props.currentUserId;

            return (
              <Message
                key={message.id}
                isMine={isMine}
                message={message.text}
                author={message.senderId}
                createdAt={message.createdAt}
              />
            )
          })}
          <span ref={lastRef} />
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
            onClick={submit}
            disabled={props.newMessageValue.length === 0}
          >
            SEND
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