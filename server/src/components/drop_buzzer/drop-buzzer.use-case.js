module.exports = class DropBuzzerUseCase {

    constructor({ roomRepository }) {
        this.roomRepository = roomRepository;
    }

    execute({ roomId, playerId }) {
        this.checkMandatoryFields({ roomId, playerId });

        const room = this.roomRepository.get(roomId);

        if (!room) {
            throw new Error("Room not found");
        }

        if (!room.isPlayerHost(playerId)) {
            throw new Error("Player is not host");
        }

        const playerWhoBuzzed = room.getPlayerWhoBuzzed();

        if (!playerWhoBuzzed) {
            throw new Error("No player has buzzed");
        }

        room.dropBuzzer();
        this.roomRepository.save(room);

        return playerWhoBuzzed;
    }

    checkMandatoryFields({ roomId, playerId }) {
        if (roomId == null) {
            throw new Error("Room id is required");
        }

        if (playerId == null) {
            throw new Error("Player id is required");
        }
    }
}