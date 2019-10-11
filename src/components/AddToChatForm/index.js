//TODO: inline styles to css
// input component
// button component
import React from 'react';
import PropTypes from 'prop-types';
import KeyboardListener from '../KeyboardListener';

const AddToChatForm = ({...props}) => (
  <KeyboardListener onEnterPress={props.chatroom.length === 0 || props.nickname.length === 0 ? () => null : props.onSubmit}>
    <h4>{props.title}</h4>
    <div className="form-group" style={{width: 350}}>
      <label htmlFor="nickname">Nickname</label>
      <input
        onChange={props.onNicknameChange}
        value={props.nickname}
        type="text"
        className="form-control"
        id="nickname"
        placeholder="nickname"
      />
    </div>
    <div className="form-group" style={{width: 350}}>
      <label htmlFor="chatroom">Chat room name</label>
      <input
        onChange={props.onChatroomChange}
        value={props.chatroom}
        type="text"
        className="form-control"
        id="chatroom"
        placeholder="chat room name"
      />
    </div>
    <button
      type="button"
      className="btn btn-success"
      style={{width: 350}}
      onClick={props.onSubmit}
      disabled={props.chatroom.length === 0 || props.nickname.length === 0}
    >
      {props.buttonLabel}
    </button>
    <button
      type="button"
      className="btn btn-primary"
      style={{width: 200, marginTop: 30}}
      onClick={props.onBackClick}
    >
      BACK
    </button>
  </KeyboardListener>
);

AddToChatForm.propTypes = {
  onBackClick: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChatroomChange: PropTypes.func.isRequired,
  onNicknameChange: PropTypes.func.isRequired,
  chatroom: PropTypes.string.isRequired,
  nickname: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  buttonLabel: PropTypes.string.isRequired,
};

export default AddToChatForm;