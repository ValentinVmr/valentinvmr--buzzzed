const PlayerBuzzUseCase = require('./player-buzz.use-case');
const roomRepository = require('../../infra/room_repository');

module.exports = {
    PlayerBuzzUseCase: new PlayerBuzzUseCase({ roomRepository })
}