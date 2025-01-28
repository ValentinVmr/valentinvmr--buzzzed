const RoomRepository = require( "../../domain/room.repository")

module.exports = class InMemoryRoomRepository extends RoomRepository {
    constructor() {
        super();
        this.rooms = new Map();
    }

    save(room) {
        this.rooms.set(room.id, room);
    }

    exists(roomId) {
        return this.rooms.has(roomId);
    }

    get(roomId) {
        return this.rooms.get(roomId);
    }

    delete(roomId) {
        this.rooms.delete(roomId);
    }
}