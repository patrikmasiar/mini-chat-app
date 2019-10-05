import React, { createContext, Component } from 'react';

const AppContext = createContext({
  userName: '',
  chatRoomName: '',
  setUserName: () => {},
  setChatRoomName: () => {},
});

export class AppProvider extends Component {
  setUserName = userName => {
    this.setState({ userName });
  };

  setChatRoomName = chatRoomName => {
    this.setState({ chatRoomName });
  };

  state = {
    userName: '',
    chatRoomName: '',
    setUserName: this.setUserName,
    setChatRoomName: this.setChatRoomName,
  };

  render() {
    return (
      <AppContext.Provider value={this.state}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export const AppConsumer = AppContext.Consumer;