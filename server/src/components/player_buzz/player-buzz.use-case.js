module.exports = class PlayerBuzzUseCase {
    constructor({ roomRepository }) {
        this.roomRepository = roomRepository;
    }

    execute({ roomId, playerId }) {
        this.checkMandatoryFields({ roomId, playerId });

        const room = this.roomRepository.get(roomId);

        if (!room) {
            throw new Error("Room not found");
        }

        if(room.hasPlayerAlreadyBuzzed()) {
            throw new Error("Player has already buzzed");
        }

        const player = room.getPlayer(playerId);

        if (!player) {
            throw new Error("Player not found");
        }

        if (!player.canBuzz()) {
            throw new Error("Player can't buzz");
        }

        room.playerHasBuzzed(playerId);
        this.roomRepository.save(room);

        return player;
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