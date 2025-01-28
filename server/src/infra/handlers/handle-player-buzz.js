const { PlayerBuzzUseCase } = require("../../components/player_buzz");
const SocketMessages = require("../socket-messages");

module.exports = (socket, payload) => {
    try {
        const { roomId } = JSON.parse(payload);
        const player = PlayerBuzzUseCase.execute({ roomId, playerId: socket.id });

        const response = {
            name: player.name,
            soundId: player.buzzer.soundId
        }

        socket.to(roomId).emit(SocketMessages.PLAYER_BUZZED, JSON.stringify(response));
        socket.emit(SocketMessages.YOU_BUZZED);
    } catch (e) {
        console.error(e);
    }
}