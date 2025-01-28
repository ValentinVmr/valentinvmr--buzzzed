const JoinRoomUseCase = require('./join-room.use-case');
const roomRepository = require('../../infra/room_repository');
const playersInRoomRepository = require('../../infra/player_in_room_repository');

module.exports = {
    JoinRoomUseCase: new JoinRoomUseCase({ roomRepository, playersInRoomRepository })
}