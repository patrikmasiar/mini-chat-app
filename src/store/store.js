import React, { createContext, Component } from 'react';

const AppContext = createContext({
  user: null,
  room: null,
  setUserName: () => {},
  setRoomName: () => {},
});

export class AppProvider extends Component {
  setUserName = user => {
    this.setState({ user });
  };

  setRoomName = room => {
    this.setState({ room })
  };

  state = {
    user: null,
    room: null,
    setUserName: this.setUserName,
    setRoomName: this.setRoomName,
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