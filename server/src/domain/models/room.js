

module.exports = class Room {
    constructor({ id, host, players = [] }) {
        this.id = id;
        this.host = host;
        this.players = players;
        this.askedPlayer = null;
    }

    addPlayer(player) {
        this.players.push(player);
    }

    playerIsAlreadyInRoom(player) {
        return this.players.some(p => p.id === player.id);
    }

    isPlayerHost(playerId) {
        return this.host.id === playerId;
    }

    getPlayer(playerId) {
        return this.players.find(p => p.id === playerId);
    }

    playerHasBuzzed(playerId) {
        this.askedPlayer = this.getPlayer(playerId);
    }

    hasPlayerAlreadyBuzzed() {
        return this.askedPlayer !== null;
    }

    getPlayerWhoBuzzed() {
        return this.askedPlayer;
    }

    dropBuzzer() {
        this.askedPlayer.dropBuzzer();
        this.askedPlayer = null;
    }

    removePlayer(playerId) {
        this.players = this.players.filter(p => p.id !== playerId);
    }
}