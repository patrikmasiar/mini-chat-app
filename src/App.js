import React, {useState} from 'react';
import './App.css';
import {AppConsumer} from './store/store';

function App() {
  const [userName, setUserName] = useState('');
  const [chatName, setChatName] = useState('');

  return (
    <div className="wrapper">
      <div>
        <AppConsumer>
          {value => {
            const submit = () => {
              value.setUserName(userName);
              value.setChatRoomName(chatName);

              setUserName('');
              setChatName('');
            };

            return (
              <>
                <input value={userName} onChange={e => setUserName(e.target.value)} placeholder='Your name' />
                <br />
                <input value={chatName} onChange={e => setChatName(e.target.value)} placeholder='Chat room name' />
                <br />
                {(userName.length !== 0 && chatName.length !== 0) && (
                  <button
                    type="button"
                    onClick={submit}
                  >
                    save
                  </button>
                )}
              </>
            );
          }}
        </AppConsumer>
      </div>
      <div>
        <AppConsumer>
          {value => {
            return (
              <>
                <br /><br />
                <span>User: {value.userName}</span>
                <br />
                <span>Chat room: {value.chatRoomName}</span>
              </>
            );
          }}
        </AppConsumer>
      </div>
    </div>
  );
}

export default App;
