const {RemovePlayerUseCase} = require('../../components/remove_player');
const SocketMessages = require('../socket-messages');
const useExceptionHandler = require("../../composables/useExceptionHandler");
const {emitException} = useExceptionHandler();

function createResponse(players = []) {
    if (players.length === 0) {
        return [];
    }

    return players.map(player => player.toDto());
}

module.exports = (socket) => {
    try {
        const {roomId, players, isGameDeleted} = RemovePlayerUseCase.execute({playerId: socket.id});

        if (isGameDeleted) {
            socket.to(roomId).emit(SocketMessages.GAME_DELETED);
        } else {
            const response = JSON.stringify(createResponse(players));
            socket.to(roomId).emit(SocketMessages.PLAYER_LEFT, response);
        }
    } catch (e) {
        emitException(socket, e);
    }
}