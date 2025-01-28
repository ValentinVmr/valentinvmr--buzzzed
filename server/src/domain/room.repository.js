
module.exports = class RoomRepository {
    constructor() {
        if (this.constructor === RoomRepository) {
            throw new TypeError('Abstract class "RoomRepository" cannot be instantiated directly');
        }
    }

    save(room) {
        throw new Error('Method "save" not implemented');
    }

    exists(roomId) {
        throw new Error('Method "exists" not implemented');
    }

    get(roomId) {
        throw new Error('Method "get" not implemented');
    }

    delete(roomId) {
        throw new Error('Method "delete" not implemented');
    }
}