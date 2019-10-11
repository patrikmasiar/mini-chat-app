import { Component } from 'react';
import PropTypes from 'prop-types';
import {KEY_CODE_ENTER} from './constants';

export default class KeyboardListener extends Component {

    static propTypes = {
        onEnterPress: PropTypes.func,
    };

    static defaultProps = {
        onEnterPress: () => null,
    };

    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyDown);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyDown);
    }

    handleKeyDown = event => {
        const {onEnterPress} = this.props;
        const {keyCode} = event;
       
        if (keyCode === KEY_CODE_ENTER) {
            onEnterPress();
        }

        return;
    };

    render() {
        return this.props.children;
    }

}