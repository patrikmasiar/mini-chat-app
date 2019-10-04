import React, { Component } from 'react';
import style from './style.module.css';
import AddMessageBox from '../AddMessageBox';
import CahtList from '../ChatList';

// eslint-disable-next-line react/prefer-stateless-function
export default class ChatArea extends Component {

    state = {
    	messages: [
    		{ id: 1, text: 'hello world', created_at: '2019-10-12 13:00' },
    		{ id: 2, text: 'hello world', created_at: '2019-10-12 13:00' },
    		{ id: 3, text: 'Dragée caramels muffin apple pie jujubes soufflé. Dragée sugar plum marshmallow gingerbread lollipop gummies cheesecake. Gingerbread liquorice bonbon croissant halvah oat cake bonbon sweet. Cake bear claw brownie dessert.', created_at: '2019-10-12 13:00' },
    		{ id: 4, text: 'hello world', created_at: '2019-10-12 13:00' },
    		{ id: 5, text: 'hello world', created_at: '2019-10-12 13:00' }
    	]
    };

    render() {
    	const { messages } = this.state;

    	return (
    		<div className={style.wrapper}>
    			<CahtList messages={messages} />
    			<AddMessageBox />
    		</div>
    	);
    }
	
}
