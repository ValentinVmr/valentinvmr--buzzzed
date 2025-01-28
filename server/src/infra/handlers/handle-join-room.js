const {JoinRoomUseCase} = require('../../components/join-room');
const SocketMessages = require('../socket-messages');

function createResponse(players = []) {
    if (players.length === 0) {
        return [];
    }

    return players.map(player => player.toDto());
}

module.exports = (socket, payload) => {
    try {
        const {roomId, name, avatar, buzzer} = JSON.parse(payload);
        const id = socket.id;

        const players = JoinRoomUseCase.execute({roomId, playerId: id, name, avatar, buzzer});
        const response = JSON.stringify(createResponse(players));

        socket.to(roomId).emit('player-joined', response);
        socket.join(roomId);
        socket.emit(SocketMessages.ROOM_JOINED, response);

    } catch (e) {
        console.error(e);
    }
}