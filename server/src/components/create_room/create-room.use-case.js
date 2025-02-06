const Host = require("../../domain/models/host")
const Room = require("../../domain/models/room")

module.exports = class CreateRoomUseCase {

    constructor({ roomRepository, playersInRoomRepository }) {
        this.roomRepository = roomRepository
        this.playersInRoomRepository = playersInRoomRepository
    }

    execute({ hostId, hostName }) {
        if(!hostId) {
            throw new Error("host.id.required");
        }

        if(!hostName) {
            throw new Error("host.name.required");
        }

        if (this.playersInRoomRepository.playerIsInRoom(hostId)) {
            throw new Error("player.already-in-room");
        }

        let roomId;
        do {
            roomId = this.createRoomId();
        } while(this.roomRepository.exists(roomId));

        const host = new Host({ id: hostId, name: hostName });
        const room = new Room({ id: roomId, host });

        this.playersInRoomRepository.save(host, roomId);
        this.roomRepository.save(room);
        return room;
    }

    createRoomId() {
        return Math.random().toString(36).substring(7);
    }

}