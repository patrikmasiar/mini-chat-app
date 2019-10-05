import React, {useState} from 'react';
import './App.css';
import {AppConsumer} from './store/store';
import axios from "axios";
import Chatkit from "@pusher/chatkit-client";
import Spinner from "react-spinkit";
import {CHATKIT_INSTANCE_LOCATOR} from './constants';

const App = () => {
  const [userName, setUserName] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [currentRoom, setCurrentRoom] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  const sendMessage = (event) => {
    event.preventDefault();

    if (message.trim() === "") return;
    
    currentUser.sendMessage({
      text: message,
      roomId: `${currentRoom.id}`
    });

    setMessage('');
  }

  return (
    <div className="wrapper">
      <div>
        <AppConsumer>
          {value => {
            
            const launchChat = () => {
              // event.preventDefault();
          
              setLoading(true);
              
              const userId = userName;

              if (userId === null || userId.trim() === "") {
                alert("Invalid userId");
                setLoading(false);
              } else {
                axios
                  .post("http://localhost:5200/users", { userId })
                  .then(() => {
                    const tokenProvider = new Chatkit.TokenProvider({
                      url: "http://localhost:5200/authenticate"
                    });
      
                    const chatManager = new Chatkit.ChatManager({
                      instanceLocator: CHATKIT_INSTANCE_LOCATOR,
                      userId,
                      tokenProvider,
                    });
      
                    return chatManager.connect().then(currentUser => {
                      setCurrentUser(currentUser);
                      currentUser
                        .createRoom({
                          name: currentUser.name,
                          private: true
                        })
                        .then(room => {
                          return currentUser
                            .subscribeToRoom({
                              roomId: `${room.id}`,
                              messageLimit: 100,
                              hooks: {
                                onMessage: message => setMessages([...messages, message]),
                              }
                            })
                            .then(currentRoom => setCurrentRoom(currentRoom));
                        })
                        // .then(() => null)
                        .catch(console.error);
                      setLoading(false);
                    });
                  })
                  .catch(console.error);
              }
            };

            const submit = () => {
              value.setUserName(userName);

              setUserName('');
              launchChat();
            };

            return (
              <>
                <input value={userName} onChange={e => setUserName(e.target.value)} placeholder='Your name' />
                <br />
                {userName.length !== 0 && (
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

      {isLoading ? <Spinner name="three-bounce" color="#300d4f" /> : null}

      <div>
        <AppConsumer>
          {value => {
            return (
              <>
                <br /><br />
                <span>User: {value.currentUser.userName}</span>
              </>
            );
          }}
        </AppConsumer>
      </div>

      <br /><br />
      <div>
          
          <div>
            {messages.map((message, index) => (
              <div key={`${message}-${index}`}>
                {message.text}
              </div>
            ))}
          </div>

          <div>

              <input placeholder="Message..." value={message} onChange={e => setMessage(e.target.value)} />
              <button
                type="button"
                onClick={sendMessage}
              >
                SEND MESSAGE
              </button>
            
          </div>

      </div>
    </div>
  );
}

export default App;
