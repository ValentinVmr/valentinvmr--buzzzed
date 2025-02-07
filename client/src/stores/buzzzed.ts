import {defineStore} from "pinia";
import {socket} from "@/socket";
import router from "@/router";
import {useNotification} from "@kyvg/vue3-notification";

const notification = useNotification();

const ERROR_NOT_SHOWED = ['player.cant-buzz'];

export const useBuzzzedStore = defineStore("buzzzed", {
  state: () => ({
    roomId: '',
    name: '',
    avatar: 0,
    buzzer: {soundId: 0},
    isBuzzerLocked: false,
    playerWhoBuzzed: {name: '', soundId: -1},
    players: [] as any[]
  }),
  actions: {
    bindEvents() {
      socket.on("room-exists", (payload: string) => {
        const {exists} = JSON.parse(payload);

        if (exists) {
          router.push({name: "ConfigureBuzzer"});
        } else {
          notification.notify({
            text: 'La salle n\'existe pas',
            type: 'error',
          });
        }
      });

      socket.on('room-joined', () => {
        router.push({name: "Buzzer"});
      });

      socket.on('player-buzzed', (payload: string) => {
        const {name, soundId} = JSON.parse(payload);
        this.playerWhoBuzzed = {name, soundId};
        this.isBuzzerLocked = true;
      });

      socket.on('you-buzzed', () => {
        this.playerWhoBuzzed = {name: this.name, soundId: this.buzzer.soundId};
        this.isBuzzerLocked = true;
      });

      socket.on('drop-buzzer', () => {
        this.isBuzzerLocked = false;
        this.playerWhoBuzzed = {name: '', soundId: -1};
      });

      socket.on('room-created', (payload: string) => {
        const {roomId} = JSON.parse(payload);
        this.roomId = roomId;

        notification.notify({
          text: 'Salle créée avec succès.',
          type: 'success',
        });

        router.push({name: 'Host'});
      });

      socket.on('player-joined', (payload: string) => {
        this.players = JSON.parse(payload) as any[];
      });

      socket.on('player-left', (payload: string) => {
        this.players = JSON.parse(payload) as any[];
      });

      socket.on('game-deleted', () => {
        this.$reset();
        router.push({name: 'Home'});
      });

      socket.on('exception', (payload: string) => {
        const { key, message } = JSON.parse(payload);

        if (ERROR_NOT_SHOWED.includes(key)) {
          return;
        }

        notification.notify({
          text: message,
          type: 'error',
        });
      });
    },

    checkRoomExists(roomId: string) {
      this.roomId = roomId;
      socket.emit("room-exists", JSON.stringify({roomId}));
    },

    joinRoom(name: string, avatar: number, buzzer: { soundId: number }) {
      socket.emit("join-room", JSON.stringify({roomId: this.roomId, name, avatar, buzzer}));
    },

    buzz() {
      socket.emit("player-buzzed", JSON.stringify({roomId: this.roomId}));
    },

    createRoom() {
      const hostName = Math.random().toString(36).substring(7);
      socket.emit("create-room", JSON.stringify({hostName}));
    },

    dropBuzzer() {
      socket.emit("drop-buzzer", JSON.stringify({roomId: this.roomId}));
    },

    leaveRoom() {
      socket.emit("player-left", "");
      this.$reset();
      router.push({name: 'Home'});
    }
  }
});
