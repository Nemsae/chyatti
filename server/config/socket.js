module.exports = function (app, io) {
  let socketEmit;
  io.on('connection', (socket) => {
    console.log('connected!');
    socketEmit = (type, data) => socket.emit(type, data);
    //  listening from frontend
    socket.on('click', (data) => {
      console.log('data: ', data);
      socket.emit('action', {
        type: 'NEW_DATA',
        payload: { selectedChatRoom: data }
      });
    });

    socket.on('disconnect', () => {
      console.log('disconnected');
    });
  });

  app.use((req, res, next) => {
    req.io = io;
    req.socketEmitter = socketEmit;
    next();
  });
};
