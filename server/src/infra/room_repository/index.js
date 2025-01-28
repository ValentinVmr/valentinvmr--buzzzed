const RoomRepository = require("./in-memory-room.repository.js");

if (!RoomRepository._instance) {
    RoomRepository._instance = new RoomRepository();
}

module.exports = RoomRepository._instance;