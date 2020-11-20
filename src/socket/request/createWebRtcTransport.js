const Room = require('./../../room');

/**
 * Handles socket createWebRtcTransport request
 * @method
 * @async
 * @param {Object} data object
 * @param {String} object.userId - User ID
 * @param {String} object.roomId - Room ID
 * @param {String} object.direction - Direction(send/recv)
 */
module.exports = async ({ userId, roomId, direction }) => {
  const method = 'createWebRtcTransport';

  try {
    const room = Room.getRoomById(roomId);
    const webRtcTransportData = await room.createWebRtcTransport({ userId, direction });
    
    return { method, data: webRtcTransportData };
  } catch (error) {
    console.error('failed to handle createWebRtcTransport request', error);
    return { method, error: error.message };
  }
};
