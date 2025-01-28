const Player = require("../../domain/models/player");
const Buzzer = require("../../domain/models/buzzer");

module.exports = class JoinRoomUseCase {
    constructor({ roomRepository, playersInRoomRepository }) {
        this.roomRepository = roomRepository;
        this.playersInRoomRepository = playersInRoomRepository;
    }

    execute({ roomId, playerId, name, avatar, buzzer }) {
        this.checkMandatoryFields({ roomId, name, avatar, buzzer });

        const createdBuzzer = new Buzzer({ soundId: buzzer.soundId });
        const player = new Player({ id: playerId, name, avatar, buzzer: createdBuzzer });
        const room = this.roomRepository.get(roomId);

        if (!room) {
            throw new Error("Room not found");
        }

        if (room.isPlayerHost(player)) {
            throw new Error("Player is host");
        }

        if (room.playerIsAlreadyInRoom(player)) {
            throw new Error("Player is already in room");
        }

        if(this.playersInRoomRepository.playerIsInRoom(playerId)) {
            throw new Error("Player is already in another room");
        }

        room.addPlayer(player);

        this.playersInRoomRepository.save(player, roomId);
        this.roomRepository.save(room);

        return room.players;
    }

    checkMandatoryFields({ roomId, name, avatar, buzzer }) {
        if (roomId == null) {
            throw new Error("Room id is required");
        }

        if (name == null) {
            throw new Error("Player name is required");
        }

        if (avatar == null) {
            throw new Error("Player avatar is required");
        }

        if (buzzer == null) {
            throw new Error("Player buzzer is required");
        }

        if (buzzer.soundId == null) {
            throw new Error("Player buzzer sound id is required");
        }
    }
}