const Room = require('./../../room');

/**
 * Handles socket produce request
 * @method
 * @async
 * @param {Object} data object
 * @param {String} object.roomId - Room ID
 * @param {String} object.userId - User ID
 * @param {String} object.transportId - Transport ID
 * @param {String} object.kind - Produce Kind (video/audio)
 * @param {Object} object.rtpParameters - Producer RTPParameters
 */
module.exports = async ({ roomId, userId, transportId, kind, rtpParameters }) => {
  const method = 'produce';

  try {
    const room = Room.getRoomById(roomId);
    const { id } = await room.createProducer({ userId, transportId, kind, rtpParameters });

    return { method, data: id }; 
  } catch (error) {
    console.error('failed to handle produce request', error);
    return { method, error: error.message };
  }
};
