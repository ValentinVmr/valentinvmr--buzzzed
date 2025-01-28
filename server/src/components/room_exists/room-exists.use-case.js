module.exports = class RoomExistsUseCase {
    constructor({ roomRepository }) {
        this.roomRepository = roomRepository;
    }

    execute(roomId) {
        if (!roomId) {
            return false;
        }

        return this.roomRepository.exists(roomId);
    }
}