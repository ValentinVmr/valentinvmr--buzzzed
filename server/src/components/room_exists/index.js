const RoomExistsUseCase = require('./room-exists.use-case');
const roomRepository = require('../../infra/room_repository');

module.exports = {
    RoomExistsUseCase: new RoomExistsUseCase({ roomRepository })
}