module.exports = class RemovePlayerUseCase {

    constructor({ roomRepository, playersInRoomRepository }) {
        this.roomRepository = roomRepository;
        this.playersInRoomRepository = playersInRoomRepository;
    }

    execute({ playerId }) {
        const roomId = this.playersInRoomRepository.getRoom(playerId);

        if (!roomId) {
            throw new Error("Player not found");
        }

        const room = this.roomRepository.get(roomId);
        const isGameDeleted = room.isPlayerHost(playerId);
        const players = room.players;

        if (isGameDeleted) {
            this.roomRepository.delete(roomId);

            players.forEach(player => {
                this.playersInRoomRepository.delete(player.id);
            });
        } else {
            room.removePlayer(playerId);
            this.roomRepository.save(room);
            this.playersInRoomRepository.delete(playerId);
        }

        return { roomId: roomId, isGameDeleted, players: room.players }
    }
}