import React, {Component} from 'react';
import style from './style.module.css'

export default class ChatController extends Component {

  state = {
    chatAction: null,
    userName: '',
    chatRoom: '',
  };

  handleChangeChatAction = chatAction => {
    this.setState({chatAction});
  };

  handleChangeUserName = e => {
    this.setState({userName: e.target.value});
  };

  handleChangeChatRoom = e => {
    this.setState({chatRoom: e.target.value});
  };

  render() {
    const {appData} = this.props;
    const {chatAction} = this.state;
    console.log('APP DATA: ', appData);

    return (
      <>
        {chatAction === null && (
          <div className={style.btnsWrapper}>
              <button type="button" className="btn btn-primary" style={{width: 200}} onClick={this.handleChangeChatAction.bind(this, 'join')}>
                Join chat
              </button>
              <button type="button" className="btn btn-info" style={{width: 200}} onClick={this.handleChangeChatAction.bind(this, 'new')}>
                Create new chat
              </button>
          </div>
        )}

        {chatAction === 'new' && (
          <div className={style.btnsWrapper}>
            <h4>NEW CHAT</h4>
            <div className="form-group" style={{width: 350}}>
              <label htmlFor="userName">Your name</label>
              <input onChange={this.handleChangeUserName} type="text" className="form-control" id="exampleInputEmail1" placeholder="Your Name" />
            </div>
            <div className="form-group" style={{width: 350}}>
              <label htmlFor="chatName">Char room name</label>
              <input onChange={this.handleChangeChatRoom} type="text" className="form-control" id="exampleInputEmail1" placeholder="chatroom" />
            </div>
            <button type="button" className="btn btn-success" style={{width: 350}}>
              CREATE CHAT
            </button>
            <button type="button" className="btn btn-primary" style={{width: 200, marginTop: 30}} onClick={this.handleChangeChatAction.bind(this, null)}>
              BACK
            </button>
          </div>
        )}

        {chatAction === 'join' && (
          <div className={style.btnsWrapper}>
            <h4>JOIN CHAT</h4>
            <div className="form-group" style={{width: 350}}>
              <label htmlFor="userName">Your name</label>
              <input onChange={this.handleChangeUserName} type="text" className="form-control" id="exampleInputEmail1" placeholder="Your Name" />
            </div>
            <div className="form-group" style={{width: 350}}>
              <label htmlFor="chatName">Char room name</label>
              <input onChange={this.handleChangeChatRoom} type="text" className="form-control" id="exampleInputEmail1" placeholder="chatroom" />
            </div>
            <button type="button" className="btn btn-success" style={{width: 350}}>
              JOIN CHAT
            </button>
            <button type="button" className="btn btn-primary" style={{width: 200, marginTop: 30}} onClick={this.handleChangeChatAction.bind(this, null)}>
              BACK
            </button>
          </div>
        )}
      </>
      
    );
  }

}