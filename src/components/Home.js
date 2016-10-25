import React, { Component } from 'react';

import ChatActions from '../actions/ChatActions';

export default class Home extends Component {
  constructor () {
    super();

    this._addRoom = this._addRoom.bind(this);
  }

  _addRoom () {
    let { roomCreateInput } = this.refs;
    let newRoom = roomCreateInput.value;
    console.log('newRoom: ', newRoom);
    let obj = {
      roomName: newRoom
    };
    ChatActions.sendNewRoom(obj);
  }

  render () {
    return (
      <div className='text-center container'>
        <h1>Chyatti</h1>
        <input type='text' ref='roomCreateInput' className='text-center createRoom' id='roomNameInput' placeholder='Insert room name...' />
        <br />
        <button type='submit' className='createRoomBtn btn btn-success btn-block col-xs-12' onClick={this._addRoom}>Create Room</button>
      </div>
    );
  }
}
