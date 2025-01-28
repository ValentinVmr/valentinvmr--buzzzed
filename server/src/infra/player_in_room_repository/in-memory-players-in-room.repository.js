const PlayersInRoomRepository = require('../../domain/players-in-room.repository');

module.exports = class InMemoryPlayersInRoomRepository extends PlayersInRoomRepository {
    constructor() {
        super();
        this.playersInRoom = {};
    }

    save(player, roomId) {
        this.playersInRoom[player.id] = roomId;
    }

    getRoom(playerId) {
        return this.playersInRoom[playerId];
    }

    playerIsInRoom(playerId) {
        return this.getRoom(playerId) !== undefined;
    }

    delete(playerId) {
        delete this.playersInRoom[playerId];
    }
}