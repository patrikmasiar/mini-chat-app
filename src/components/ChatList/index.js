import { h, Component } from 'preact';
import style from './style.css';
import ChatBubble from '../ChatBubble';

// eslint-disable-next-line react/prefer-stateless-function
export default class ChatList extends Component {

	render() {
		const { messages } = this.props;
        
		return (
			<div className={style.wrapper}>
				{messages.map(item => (
					<ChatBubble
						message={item.text}
					/>
				))}
			</div>
		);
	}
	
}
