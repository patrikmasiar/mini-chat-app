import React, { createContext, Component } from 'react';

const AppContext = createContext({
  user: null,
  room: null,
  setUser: () => {},
  setRoom: () => {},
});

export class AppProvider extends Component {
  setUser = user => {
    this.setState({ user });
  };

  setRoom = room => {
    this.setState({ room })
  };

  state = {
    user: null,
    room: null,
    setUser: this.setUser,
    setRoom: this.setRoom,
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