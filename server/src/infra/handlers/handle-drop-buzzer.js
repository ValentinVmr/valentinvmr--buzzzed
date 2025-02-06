const {DropBuzzerUseCase} = require('../../components/drop_buzzer');
const SocketMessages = require('../socket-messages');
const useExceptionHandler = require("../../composables/useExceptionHandler");

const {emitException} = useExceptionHandler();

module.exports = (socket, payload) => {
    try {
        const {roomId} = JSON.parse(payload);
        DropBuzzerUseCase.execute({roomId, playerId: socket.id});
        socket.to(roomId).emit(SocketMessages.DROP_BUZZER);
        socket.emit(SocketMessages.DROP_BUZZER);
    } catch (e) {
        emitException(socket, e);
    }
}