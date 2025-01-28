const CreateRoomUseCase = require("./create-room.use-case")
const roomRepository = require("../../infra/room_repository")
const playersInRoomRepository = require("../../infra/player_in_room_repository")

module.exports = {
    CreateRoomUseCase: new CreateRoomUseCase({ roomRepository, playersInRoomRepository })
}