import axios from 'axios';
import ServerActions from './actions/ServerActions';

const API = {
  fetchChatRooms () {
    axios.get('/api/chat/')
      .then((res) => {
        ServerActions.receiveChatRooms(res.data);
      })
      .catch((err) => {
        console.log('ERROR! API.fetchChatRooms', err);
      });
  },

  sendNewMessage (id, newMessage) {
    axios.post(`/api/chat/room/${id}`, newMessage)
      .then(this.fetchChatRooms)
      .catch((err) => {
        console.log('ERROR! API.fetchChatRooms', err);
      });
  }
};

export default API;
