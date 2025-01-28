const PlayersInRoomRepository = require('./in-memory-players-in-room.repository')

if (!PlayersInRoomRepository._instance) {
    PlayersInRoomRepository._instance = new PlayersInRoomRepository();
}

module.exports = PlayersInRoomRepository._instance;