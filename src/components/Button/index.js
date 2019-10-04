import React, { Component } from 'react';
import style from './style.module.css';

// eslint-disable-next-line react/prefer-stateless-function
export default class Button extends Component {

	render() {
		const { label, type = 'info', onClick } = this.props;

		let bgColor = null;
		switch (type) {
			case 'info':
				bgColor = '#5D93FC';
				break;
			case 'success':
				bgColor = '#A0E47C';
				break;
			default:
				bgColor = '#000';
		}

		return (
			<button
				type="button"
				onClick={onClick}
				className={style.button}
				style={{ backgroundColor: bgColor }}
			>
				{label}
			</button>
		);
	}
	
}
