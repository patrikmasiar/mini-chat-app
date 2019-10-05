import React, { createContext, Component } from 'react';

const AppContext = createContext({
  currentUser: {
    id: null,
    userName: '',
  },
  setUserName: () => {},
});

export class AppProvider extends Component {
  setUserName = userName => {
    this.setState({ currentUser: {id: userName, userName} });
  };

  state = {
    currentUser: {
      id: null,
      userName: '',
    },
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