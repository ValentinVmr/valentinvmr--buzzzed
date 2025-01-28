module.exports = class PlayersInRoomRepository {
    constructor() {
        if (this.constructor === PlayersInRoomRepository) {
            throw new TypeError("Cannot construct 'PlayersInRoomRepository' instances directly");
        }
    }

    save(player, roomId) {
        throw new Error("Method 'save' not implemented");
    }

    getRoom(playerId) {
        throw new Error("Method 'getRoom' not implemented");
    }

    delete(playerId) {
        throw new Error("Method 'delete' not implemented");
    }

    playerIsInRoom(playerId) {
        throw new Error("Method 'playerIsInRoom' not implemented");
    }
}