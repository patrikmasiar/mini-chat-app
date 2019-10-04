import React, {Component } from 'react';
import style from './style.module.css';

// eslint-disable-next-line react/prefer-stateless-function
export default class ChatBubble extends Component {

	render() {
		const { message } = this.props;
        
		return (
			<div className={style.wrapper}>
				{message}
			</div>
		);
	}
	
}