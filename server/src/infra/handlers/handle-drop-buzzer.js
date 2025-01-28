const { DropBuzzerUseCase } = require('../../components/drop_buzzer');
const SocketMessages = require('../socket-messages');

module.exports = (socket, payload) => {
    try {
        const { roomId } = JSON.parse(payload);
        const playerWhoBuzzed = DropBuzzerUseCase.execute({ roomId, playerId: socket.id });
        socket.to(playerWhoBuzzed.id).emit(SocketMessages.DROP_BUZZER);
    } catch (e) {
        console.error(e);
    }
}