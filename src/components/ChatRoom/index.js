import React, {useRef} from 'react';
import style from './style.module.css';
import PropTypes from 'prop-types';
import Message from '../Message';
import Spinner from "react-spinkit";
import Footer from './components/Footer';
import Header from './components/Header';

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
      <Header
        onLeaveChat={leaveChat}
        title={props.title}
      />
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
      <Footer
        onSubmit={submit}
        onMessageChange={props.onNewMessageChange}
        value={props.newMessageValue}
      />
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