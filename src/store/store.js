import React, { createContext, Component } from 'react';

const AppContext = createContext({
  userName: '',
  setUserName: () => {},
});

export class AppProvider extends Component {
  setUserName = userName => {
    this.setState({ userName });
  };

  state = {
    userName: 'New User',
    setUserName: this.setUserName,
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