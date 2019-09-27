import { h, Component } from 'preact';
import style from './style.css';
import ChatArea from './ChatArea';

// eslint-disable-next-line react/prefer-stateless-function
export default class Application extends Component {

	render() {
		return (
			<div className={style.wrapper}>
				<div style={{ width: 650 }}>
				    <ChatArea />
				</div>
			</div>
		);
	}
	
}
