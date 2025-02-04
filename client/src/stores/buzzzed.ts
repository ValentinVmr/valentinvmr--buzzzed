import { defineStore } from "pinia";
import { socket } from "@/socket";
import router from "@/router";

export const useBuzzzedStore = defineStore("buzzzed", {
  state: () => ({
    roomId: '',
    name: '',
    avatar: 0,
    buzzer: { soundId: 0 },
    isBuzzerLocked: false,
    playerWhoBuzzed: { name: '', soundId: -1 },
  }),
  actions: {
    bindEvents() {
      socket.on("room-exists", (payload: string) => {
        const { exists } = JSON.parse(payload);

        if (exists) {
          router.push({ name: "ConfigureBuzzer" });
        }
      });

      socket.on('room-joined', () => {
          router.push({ name: "Buzzer" });
      });

      socket.on('player-buzzed', (payload: string) => {
        const { name, soundId } = JSON.parse(payload);
        this.playerWhoBuzzed = { name, soundId };
        this.isBuzzerLocked = true;
      });

      socket.on('you-buzzed', () => {
        this.playerWhoBuzzed = { name: this.name, soundId: this.buzzer.soundId };
        this.isBuzzerLocked = true;
      });

      socket.on('drop-buzzer', () => {
        this.isBuzzerLocked = false;
        this.playerWhoBuzzed = { name: '', soundId: -1 };
      });

      socket.on('room-created', (payload: string) => {
        const { roomId } = JSON.parse(payload);
        this.roomId = roomId;
        router.push({ name: 'Host'});
      });
    },

    checkRoomExists(roomId: string) {
      this.roomId = roomId;
      socket.emit("room-exists", JSON.stringify({ roomId }));
    },

    joinRoom(name: string, avatar: number, buzzer: { soundId: number }) {
      socket.emit("join-room", JSON.stringify({ roomId: this.roomId, name, avatar, buzzer }));
    },

    buzz() {
      socket.emit("player-buzzed", JSON.stringify({ roomId: this.roomId }));
    },

    createRoom() {
      const hostName = Math.random().toString(36).substring(7);
      socket.emit("create-room", JSON.stringify({ hostName }));
    },

    dropBuzzer(roomId: string) {
      socket.emit("drop-buzzer", JSON.stringify({ roomId }));
    }
  }
});
