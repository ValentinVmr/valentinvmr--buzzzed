module.exports = class Buzzer {
    static BUZZER_DISABLE_TIME = 2000;

    constructor({ soundId }) {
        this.soundId = soundId;
        this.lastBuzzedAt = null;
    }

    dropBuzzer() {
        this.lastBuzzedAt = new Date();
    }

    canBuzz() {
        if (this.lastBuzzedAt === null) {
            return true;
        }

        const now = new Date();
        const diff = now - this.lastBuzzedAt;

        return diff > Buzzer.BUZZER_DISABLE_TIME;
    }
}