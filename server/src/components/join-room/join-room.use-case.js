const Player = require("../../domain/models/player");
const Buzzer = require("../../domain/models/buzzer");

module.exports = class JoinRoomUseCase {
    constructor({ roomRepository, playersInRoomRepository }) {
        this.roomRepository = roomRepository;
        this.playersInRoomRepository = playersInRoomRepository;
    }

    execute({ roomId, playerId, name, avatar, buzzer }) {
        this.checkMandatoryFields({ roomId, name, avatar, buzzer });

        const createdBuzzer = new Buzzer({ soundId: buzzer.soundId, id: buzzer.id });
        const player = new Player({ id: playerId, name, avatar, buzzer: createdBuzzer });
        const room = this.roomRepository.get(roomId);

        if (!room) {
            throw new Error("room.not-found");
        }

        if (room.isPlayerHost(player)) {
            throw new Error("player.cannot-be-host");
        }

        if (room.playerIsAlreadyInRoom(player)) {
            throw new Error("player.already-in-room");
        }

        if(this.playersInRoomRepository.playerIsInRoom(playerId)) {
            throw new Error("player.already-in-another-room");
        }

        room.addPlayer(player);

        this.playersInRoomRepository.save(player, roomId);
        this.roomRepository.save(room);

        return room.players;
    }

    checkMandatoryFields({ roomId, name, avatar, buzzer }) {
        if (roomId == null) {
            throw new Error("room.id.required");
        }

        if (name == null) {
            throw new Error("player.name.required");
        }

        if (avatar == null) {
            throw new Error("player.avatar.required");
        }

        if (buzzer == null) {
            throw new Error("player.buzzer.required");
        }

        if (buzzer.soundId == null) {
            throw new Error("player.buzzer.sound-id.required");
        }
    }
}