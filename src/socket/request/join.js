const Room = require('./../../room');

/**
 * Handles socket join request
 * @method
 * @param {Object} join room data object
 * @param {String} object.userId - User ID
 * @param {String} object.roomId - Room ID
 * @param {Object} object.rtpCapabilities - User's RTPCapabilities object
 */
module.exports = (socket, { userId, roomId, rtpCapabilities }) => {
  const action = 'join';
 
  try {
    const room = Room.getRoomById(roomId);

    socket.room = room;
    room.join({ userId, rtpCapabilities });

    return { action };
  } catch (error) {
    console.error('failed to handle join room request', error);
    return { action, error: error.message };
  }
};
