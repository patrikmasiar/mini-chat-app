import { h, Component } from 'preact';
import style from './style.css';
import AddMessageBox from '../AddMessageBox';

// eslint-disable-next-line react/prefer-stateless-function
export default class ChatArea extends Component {

	render() {
		return (
			<div className={style.wrapper}>
				<AddMessageBox />
			</div>
		);
	}
	
}
