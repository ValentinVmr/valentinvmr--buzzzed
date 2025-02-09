const {PlayerBuzzUseCase} = require("../../components/player_buzz");
const SocketMessages = require("../socket-messages");
const useExceptionHandler = require("../../composables/useExceptionHandler");
const {emitException} = useExceptionHandler();

module.exports = (socket, payload) => {
    try {
        const {roomId} = JSON.parse(payload);
        const player = PlayerBuzzUseCase.execute({roomId, playerId: socket.id});

        const response = {
            name: player.name,
            soundId: player.buzzer.soundId,
            buzzerId: player.buzzer.id
        }

        socket.to(roomId).emit(SocketMessages.PLAYER_BUZZED, JSON.stringify(response));
        socket.emit(SocketMessages.YOU_BUZZED);
    } catch (e) {
        emitException(socket, e);
    }
}