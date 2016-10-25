import API from '../API';

const ChatActions = {
  sendNewMessage (id, newMessage) {
    API.sendNewMessage(id, newMessage);
  }
};

export default ChatActions;
