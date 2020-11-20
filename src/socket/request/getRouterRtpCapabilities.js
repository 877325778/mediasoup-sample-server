const Room = require('../../room');

/**
 * Handles socket getRouterRtpCapabilities request
 * @method
 * @async
 * @param {Object} data object
 * @param {String} object.roomId - Room ID
 */
module.exports = async (socket) => {
  const { roomId } = socket;
  const method = 'getRouterRtpCapabilities';
  let room;

  try {
    room = Room.getRoomById(roomId);
  } catch (error) {
    // Room is not created so create it

    room = await Room.Room.create({ roomId });
    Room.addRoom(room);
    setRoomListeners(socket, room);
  }
    
  return { method, data: room.routerRtpCapabilities };
};

const setRoomListeners = (socket, room) => {
  room.on('newuser', userId => {
    socket.broadcast({
      method: 'newuser',
      userId
    });
  });

  room.on('consumerclose', (userId, consumerId) => {
    socket.broadcast({
      method: 'consumerclose',
      userId,
      consumerId
    });
  });

  room.on('producerpause', (userId, consumerId) => {
    socket.broadcast({
      method: 'producerpause',
      userId,
      consumerId
    });
  });

  room.on('producerresume', (userId, consumerId) => {
    socket.broadcast({
      method: 'producerresume',
      userId,
      consumerId
    });
  });

  room.on('score', (userId, consumerId) => {
    socket.broadcast({
      method: 'score',
      userId,
      consumerId
    });
  });

  room.on('newConsumer', consumerData => {
    socket.emitToSocket(consumerData.consumerUserId, {
      method: 'newConsumer',
      data: consumerData
    });
  });

  room.on('close', () => {
    socket.broadcast({
      method: 'close'
    });
  });
};
