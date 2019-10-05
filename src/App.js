import React from 'react';
import {AppConsumer} from './store/store';
import ChatController from './components/ChatController';

const App = () => (
  <div className="container">
    <AppConsumer>
      {value => (
        <ChatController appData={value} />
      )}
    </AppConsumer>
  </div>
);

export default App;
