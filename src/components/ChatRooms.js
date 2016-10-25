import React, { Component } from 'react';
import moment from 'moment';

import ChatStore from '../stores/ChatStore';
import API from '../API';
import ChatActions from '../actions/ChatActions';

export default class ChatRoom extends Component {
  constructor () {
    super();

    this.state = {
      chatRooms: ChatStore.getChatRooms()
    };

    this._onChange = this._onChange.bind(this);
    this._addMessage = this._addMessage.bind(this);
  }

  componentWillMount () {
    API.fetchChatRooms();
    ChatStore.startListening(this._onChange);
  }

  componentWillUnmount () {
    ChatStore.stopListening(this._onChange);
  }

  _onChange () {
    this.setState({
      chatRooms: ChatStore.getChatRooms()
    });
  }

  _addMessage (chatRoom) {
    let id = chatRoom._id;
    console.log('id: ', id);
    let newMessage = this.refs[id].value;
    console.log('newMessage: ', newMessage);
    let messagePackage = {
      message: newMessage
    };
    console.log('messagePackage: ', messagePackage);
    ChatActions.sendNewMessage(id, messagePackage);
    this.refs[id].value = '';
  }

  render () {
    let { chatRooms } = this.state;
    console.log('chatRooms in views: ', chatRooms);
    return (
      <div>
        <h1 className='text-center'>Chyatties</h1>
        {
          chatRooms.map((chatRoom) => {
            let time = moment(chatRoom.createdAt).format('dddd, MMMM Do YYYY, h:mm:ss a');

            return (
              <div className='col-xs-12' key={chatRoom._id}>
                <h2 className='text-center'>{chatRoom.roomName}</h2>
                <h5 className='text-center'>Created on {time}</h5>
                <button className='btn btn-primary updateButton text-center' data-toggle='modal' data-target={`#modal${chatRoom._id}`}>Open</button>

                <div className='modal fade' id={`modal${chatRoom._id}`} tabIndex='-1' role='dialog' aria-labelledby='myModalLabel' aria-hidden='true'>
                  <div className='modal-dialog' role='document'>
                    <div className='modal-content'>
                      <div className='modal-header'>
                        <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
                          <span aria-hidden='true'>&times;</span>
                        </button>
                        <h4 className='modal-title' id='myModalLabel'>{chatRoom.roomName} Room</h4>
                      </div>
                      <div className='modal-body'>
                        <div>
                          {
                            chatRoom.messages.map((message, i) => {
                              return (
                                <h5 key={i}>{moment(message.timeStamp).format('dddd, MMMM Do YYYY, h:mm:ss a')}: {message.message}</h5>
                              );
                            })
                          }
                        </div>
                        <textarea className='col-xs-12' rows='3' type='text' ref={chatRoom._id} placeholder='Type your message here...' />
                      </div>
                      <div className='modal-footer'>
                        <button type='button' className='btn btn-secondary' onClick={this._addMessage.bind(this, chatRoom)}>Add Message</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        }
      </div>
    );
  }
}
