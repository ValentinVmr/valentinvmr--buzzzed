const { CreateRoomUseCase } = require("../../components/create_room");
const SocketMessages = require("../socket-messages");

module.exports = (socket, message) => {
    try {
        const { hostName } = JSON.parse(message);
        const { id: roomId } = CreateRoomUseCase.execute({hostId: socket.id, hostName});
        socket.join(roomId);
        socket.emit(SocketMessages.ROOM_CREATED, JSON.stringify({ roomId }));
    } catch(e) {
        console.error(e);
    }
}