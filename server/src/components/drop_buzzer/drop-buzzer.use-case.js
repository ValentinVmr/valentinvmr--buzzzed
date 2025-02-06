module.exports = class DropBuzzerUseCase {

    constructor({ roomRepository }) {
        this.roomRepository = roomRepository;
    }

    execute({ roomId, playerId }) {
        this.checkMandatoryFields({ roomId, playerId });

        const room = this.roomRepository.get(roomId);

        if (!room) {
            throw new Error("room.not-found");
        }

        if (!room.isPlayerHost(playerId)) {
            throw new Error("player.must-be-host");
        }

        const playerWhoBuzzed = room.getPlayerWhoBuzzed();

        if (!playerWhoBuzzed) {
            throw new Error("player.nobody-buzzed");
        }

        room.dropBuzzer();
        this.roomRepository.save(room);
    }

    checkMandatoryFields({ roomId, playerId }) {
        if (roomId == null) {
            throw new Error("room.id.required");
        }

        if (playerId == null) {
            throw new Error("player.id.required");
        }
    }
}