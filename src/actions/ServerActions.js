import AppDispatcher from '../AppDispatcher';
import * as types from '../actions/actionTypes';

const ServerActions = {
  receiveChatRooms (chatRooms) {
    AppDispatcher.dispatch({
      type: types.RECEIVE_CHAT_ROOMS,
      payload: { chatRooms }
    });
  }
};

export default ServerActions;
