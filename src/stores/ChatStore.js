import { EventEmitter } from 'events';
import AppDispatcher from '../AppDispatcher';
import * as types from '../actions/actionTypes';

let _chatRooms = [];
let _data = '';

class ChatStore extends EventEmitter {
  constructor () {
    super();

    AppDispatcher.register((action) => {
      switch (action.type) {
        case types.RECEIVE_CHAT_ROOMS: {
          let { chatRooms } = action.payload;
          _chatRooms = chatRooms;
          this.emit('CHANGE');
        } break;
        case 'NEW_DATA': {
          _data = action.payload.selectedChatRoom;
          console.log('_data: ', _data);
          this.emit('CHANGE');
          break;
        }
      }
    });
  }

  startListening (cb) {
    this.on('CHANGE', cb);
  }

  stopListening (cb) {
    this.removeListener('CHANGE', cb);
  }

  getChatRooms () {
    return _chatRooms;
  }

  getData () {
    return _data;
  }
}

export default new ChatStore();
