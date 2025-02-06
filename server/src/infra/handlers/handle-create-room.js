const {CreateRoomUseCase} = require("../../components/create_room");
const SocketMessages = require("../socket-messages");
const useExceptionHandler = require("../../composables/useExceptionHandler");

const {emitException} = useExceptionHandler();

module.exports = (socket, message) => {
    try {
        const {hostName} = JSON.parse(message);
        const {id: roomId} = CreateRoomUseCase.execute({hostId: socket.id, hostName});
        socket.join(roomId);
        socket.emit(SocketMessages.ROOM_CREATED, JSON.stringify({roomId}));
    } catch (e) {
        emitException(socket, e);
    }
}