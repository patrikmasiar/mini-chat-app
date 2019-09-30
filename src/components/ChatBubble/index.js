import { h, Component } from 'preact';
import style from './style.css';

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