import React, { Component } from 'react';
import style from './style.module.css';
import ChatBubble from '../ChatBubble';

// eslint-disable-next-line react/prefer-stateless-function
export default class ChatList extends Component {

	render() {
		const { messages } = this.props;
        
		return (
			<div className={style.wrapper}>
				{messages.map(item => (
					<ChatBubble
						key={item.id}
						message={item.text}
					/>
				))}
			</div>
		);
	}
	
}
