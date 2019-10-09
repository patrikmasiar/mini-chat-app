import React from 'react';
import PropTypes from 'prop-types';
import style from './style.module.css';
import KeyboardListener from '../../../KeyboardListener';

const classes = require('react-style-classes');

const Footer = ({...props}) => (
  <KeyboardListener onEnterPress={props.value.length === null ? () => null : props.onSubmit}>
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
  </KeyboardListener>
);

Footer.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onMessageChange: PropTypes.func.isRequired,
  value: PropTypes.func.isRequired,
};

export default Footer;
