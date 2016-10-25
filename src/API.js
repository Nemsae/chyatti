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
  },

  sendNewRoom (newRoom) {
    axios.post('/api/chat/', newRoom)
      // .then(this.fetchChatRooms)
      .catch((err) => {
        console.log('ERROR! API.sendNewRoom', err);
      });
  }
};

export default API;
