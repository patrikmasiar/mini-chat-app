import { h, Component } from 'preact';
import AddMessageBox from '../AddMessageBox';

// eslint-disable-next-line react/prefer-stateless-function
export default class ChatArea extends Component {

	render() {
		return (
			<div>
				<AddMessageBox />
			</div>
		);
	}
	
}
