import { h, Component } from 'preact';
import Application from './Application';

// eslint-disable-next-line react/prefer-stateless-function
export default class App extends Component {

	render() {
		return (
			<div id="app">
				<Application />
			</div>
		);
	}
	
}
