const RemovePlayerUseCase = require('./remove-player.use-case');
const roomRepository = require('../../infra/room_repository');
const playersInRoomRepository = require('../../infra/player_in_room_repository');

module.exports = {
    RemovePlayerUseCase: new RemovePlayerUseCase({roomRepository, playersInRoomRepository})
}