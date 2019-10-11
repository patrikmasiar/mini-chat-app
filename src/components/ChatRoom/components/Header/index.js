import React from 'react'
import PropTypes from 'prop-types';
import style from './style.module.css';

const classes = require('react-style-classes');

const Header = ({...props}) => (
  <div className={classes("card-header", style.header)}>
    <span className={style.title}>{props.title}</span>
    <button className="btn btn-sm btn-danger" onClick={props.onLeaveChat}>
      Leave chat
    </button>
  </div>
);

Header.propTypes = {
  onLeaveChat: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default Header;
