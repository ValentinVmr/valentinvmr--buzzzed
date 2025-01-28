module.exports = class Player {
    constructor({ id, name, avatar, buzzer }) {
        this.id = id;
        this.name = name;
        this.avatar = avatar;
        this.buzzer = buzzer;
    }

    canBuzz() {
        return this.buzzer.canBuzz();
    }

    dropBuzzer() {
        this.buzzer.dropBuzzer();
    }

    toDto() {
        return {
            name: this.name,
            avatar: this.avatar,
            buzzer: this.buzzer
        }
    }
}