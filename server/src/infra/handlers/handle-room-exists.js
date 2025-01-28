const { RoomExistsUseCase } = require('../../components/room_exists');
const SocketMessages = require('../socket-messages');

module.exports = (socket, payload) => {
    try {
        const { roomId } = JSON.parse(payload);
        const exists = RoomExistsUseCase.execute(roomId);
        socket.emit(SocketMessages.ROOM_EXISTS, JSON.stringify({ exists }));
    } catch (e) {
        console.error(e);
    }
}