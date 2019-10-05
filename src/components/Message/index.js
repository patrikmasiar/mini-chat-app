import React from 'react';
import style from './style.module.css';
import PropTypes from 'prop-types';

const classes = require('react-style-classes');

const Message = ({...props}) => (
  <div
    className={classes(style.message, props.isMine && style.mineMessage)}
  >
    {props.message}
  </div>
);

Message.propTypes = {
  isMine: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
};

export default Message;