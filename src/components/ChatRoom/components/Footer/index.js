import React from 'react';
import PropTypes from 'prop-types';
import style from './style.module.css';

const classes = require('react-style-classes');

const Footer = ({...props}) => (
  <div className="card-footer">
    <div className={style.sendWrapper}>
      <input
        placeholder="type your message..."
        className="form-control"
        onChange={props.onMessageChange}
        value={props.value}
      />
      <button
        type="button"
        className={classes("btn btn-success", style.button)}
        onClick={props.onSubmit}
        disabled={props.value.length === 0}
      >
        SEND
      </button>
    </div>
  </div>
);

Footer.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onMessageChange: PropTypes.func.isRequired,
  value: PropTypes.func.isRequired,
};

export default Footer;
