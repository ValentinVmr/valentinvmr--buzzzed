const SocketMessages = require('../socket-messages');
const handleCreateRoom = require('./handle-create-room');
const handleRoomExists = require('./handle-room-exists');
const handleJoinRoom = require('./handle-join-room');
const handlePlayerBuzz = require('./handle-player-buzz');
const handleDropBuzzer = require('./handle-drop-buzzer');
const handlePlayerLeave = require('./handle-player-leave');

module.exports = (socket) => {
    socket.on(SocketMessages.CREATE_ROOM, (payload) => handleCreateRoom(socket, payload));
    socket.on(SocketMessages.ROOM_EXISTS, (payload) => handleRoomExists(socket, payload));
    socket.on(SocketMessages.JOIN_ROOM, (payload) => handleJoinRoom(socket, payload));
    socket.on(SocketMessages.PLAYER_BUZZED, (payload) => handlePlayerBuzz(socket, payload));
    socket.on(SocketMessages.DROP_BUZZER, (payload) => handleDropBuzzer(socket, payload));
    socket.on(SocketMessages.PLAYER_LEFT, () => handlePlayerLeave(socket));
    socket.on(SocketMessages.DISCONNECT, () => handlePlayerLeave(socket));
}