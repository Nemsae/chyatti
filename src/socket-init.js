//  initialize socket connection
import io from 'socket.io-client';
import AppDispatcher from './AppDispatcher';

const socket = io();

socket.on('action', (action) => {
  console.log('action: ', action);
  AppDispatcher.dispatch(action);
});

export default socket;
