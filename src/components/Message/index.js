import React from 'react';
import style from './style.module.css';
import PropTypes from 'prop-types';
import moment from 'moment';

const classes = require('react-style-classes');

const Message = ({...props}) => (
  <>
    <div className={props.isMine ? style.me : null} style={{marginBottom: 5}}>
      <span className={style.author}>{props.author},</span>
      <span className={style.createdAt}>{(moment.utc(props.createdAt).local().format('DD.MM.YYYY h:m A'))}</span>
    </div>
    <div
      className={classes(style.message, props.isMine && style.mineMessage)}
    >
      {props.message}
    </div>
  </>
);

Message.propTypes = {
  isMine: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
};

export default Message;