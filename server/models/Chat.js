const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  roomName: String,
  messages: { type: Array },
  // messages: [{ type: String, date: Date.now }],
  createdAt: { type: Date, default: Date.now }
});

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;
