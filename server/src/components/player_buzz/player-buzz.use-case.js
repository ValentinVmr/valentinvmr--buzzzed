module.exports = class PlayerBuzzUseCase {
    constructor({ roomRepository }) {
        this.roomRepository = roomRepository;
    }

    execute({ roomId, playerId }) {
        this.checkMandatoryFields({ roomId, playerId });

        const room = this.roomRepository.get(roomId);

        if (!room) {
            throw new Error("room.not-found");
        }

        if(room.hasPlayerAlreadyBuzzed()) {
            throw new Error("player.already-buzzed");
        }

        const player = room.getPlayer(playerId);

        if (!player) {
            throw new Error("player.not-found");
        }

        if (!player.canBuzz()) {
            throw new Error("player.cant-buzz");
        }

        room.playerHasBuzzed(playerId);
        this.roomRepository.save(room);

        return player;
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