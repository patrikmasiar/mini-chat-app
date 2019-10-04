import React, { Component } from 'react';
import style from './style.module.css';
import Button from '../Button';

// eslint-disable-next-line react/prefer-stateless-function
export default class AddMessageBox extends Component {

	render() {
		return (
			<div className={style.wrapper}>
				<div className={style.header}>
					<span>New message</span>
				</div>
				<div className={style.body}>
				    <textarea className={style.textarea} placeholder="Write a message..." />
				</div>
				<div className={style.footer}>
					<Button label="Send" type="info" />
				</div>
			</div>
		);
	}
	
}
