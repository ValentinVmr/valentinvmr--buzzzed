const DropBuzzerUseCase = require('./drop-buzzer.use-case');
const roomRepository = require('../../infra/room_repository');

module.exports = {
    DropBuzzerUseCase: new DropBuzzerUseCase({ roomRepository }),
}