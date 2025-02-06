const {RoomExistsUseCase} = require('../../components/room_exists');
const SocketMessages = require('../socket-messages');
const useExceptionHandler = require("../../composables/useExceptionHandler");
const {emitException} = useExceptionHandler();

module.exports = (socket, payload) => {
    try {
        const {roomId} = JSON.parse(payload);
        const exists = RoomExistsUseCase.execute(roomId);
        socket.emit(SocketMessages.ROOM_EXISTS, JSON.stringify({exists}));
    } catch (e) {
        emitException(socket, e);
    }
}