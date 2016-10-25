import React, { Component } from 'react';

export default class Home extends Component {

  render () {
    return (
      <div className='text-center container'>
        <h1>Chyatti</h1>
        <input type='text' className='text-center createRoom' id='roomNameInput' placeholder='Insert room name...' />
        <br />
        <button type='submit' className='createRoomBtn btn btn-primary btn-block col-xs-12'>Create Room</button>
      </div>
    );
  }
}
