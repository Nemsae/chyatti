import API from '../API';

const ChatActions = {
  sendNewMessage (id, newMessage) {
    API.sendNewMessage(id, newMessage);
  },

  sendNewRoom (newRoom) {
    console.log('newRoom in actions: ', newRoom);
    API.sendNewRoom(newRoom);
  }
};

export default ChatActions;
