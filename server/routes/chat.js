const express = require('express');
const router = express.Router();

const Chat = require('../models/Chat');

router.route('/room/:name')
  .get((req, res) => {
    let { name } = req.params;
    name = name.toLowerCase();
    Chat.findOne({ 'roomName': name })
      .then((chatRoom) => {
        res.send(chatRoom);
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  })
  .post((req, res) => {
    //  name here will be the _id instead
    let { name } = req.params;
    let message = req.body;
    Chat.findById(name)
      .then((chatRoom) => {
        message.timeStamp = Date.now();
        chatRoom.messages.push(message);
        return chatRoom.save();
      })
      .then((chatRoom) => {
        res.send(chatRoom);
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  });

router.route('/')
  .get((req, res) => {
    Chat.find({}, (err, chats) => {
      res.status(err ? 400 : 200).send(err || chats);
    });
  })
  //  create a New Chatroom
  .post((req, res) => {
    let newChatRoom = req.body;
    console.log('newChatRoom: ', newChatRoom);
    Chat.create(req.body)
      .then((chatRoom) => {
        chatRoom.roomName = newChatRoom.roomName;
        return chatRoom.save();
      })
      .then((chatRoom) => {
        res.send(chatRoom);
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  });

router.route('/:id')
  .put((req, res) => {
    let id = req.params.id;
    Chat.findById(id)
      .then((chat) => {
        chat.price *= 2;
        return chat.save();
      })
      .then((savedChat) => {
        res.send(savedChat);
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  })
  .delete((req, res) => {
    let id = req.params.id;
    console.log('id: ', id);
    Chat.findByIdAndRemove(id)
      .then((query) => {
        res.send(query);
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  });

module.exports = router;
