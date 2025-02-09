<script lang="ts" setup>

import BuzzzedRoomCode from "@/components/BuzzzedRoomCode.vue";
import {useBuzzzedStore} from "@/stores/buzzzed";
import {useAvatars} from "@/composables/useAvatars";
import IconTimes from "@/components/icons/IconTimes.vue";
import {useSounds} from "@/composables/useSounds";
import {computed, onBeforeUnmount, onUnmounted, watch} from "vue";
import {useRouter} from "vue-router";


const buzzzedStore = useBuzzzedStore();
const {getAvatar} = useAvatars();
const { getSound } = useSounds();
const playerRef = computed(() => buzzzedStore.playerWhoBuzzed);
const router = useRouter();

if (buzzzedStore.roomId === '') {
  router.push('/');
}

function getPlayers() {
  return buzzzedStore.players;
}

function hasOnePLayerInRoom() {
  return buzzzedStore.players.length > 0;
}

function isPlayerActive(player: any) {
  console.log(player.buzzerId, buzzzedStore.playerWhoBuzzed.buzzerId);
  return buzzzedStore.playerWhoBuzzed.buzzerId === player.buzzer.id;
}

function onePlayerBuzzed() {
  return buzzzedStore.playerWhoBuzzed.buzzerId !== '';
}

function releaseBuzzer() {
  buzzzedStore.dropBuzzer();
}

watch(playerRef, (value, oldValue) => {

  if (onePlayerBuzzed()) {
    playPlayerSound(value.soundId);
  }
}, { deep: true });

function playPlayerSound(soundId: number) {
  const sound = getSound(soundId);
  const audio = new Audio(`/sounds/${sound.file}`);
  audio.play().catch(console.error);
}

onBeforeUnmount(() => buzzzedStore.leaveRoom());
</script>

<template>
  <section class="host-view">
    <article>
      <h1>ID de la salle</h1>
      <buzzzed-room-code/>
    </article>

    <article v-if="hasOnePLayerInRoom()">
      <h1>Joueur.euse.s</h1>
      <button v-if="onePlayerBuzzed()" @click="releaseBuzzer()" class="release-buzzer">
        <IconTimes /> Libérer le buzzer
      </button>
      <ul class="player-list">
        <li class="player" :class="{ active: isPlayerActive(player)}" v-for="player in getPlayers()">
          <div class="player-info">
            <img :src="`/avatars/${getAvatar(player.avatar)}`" alt="Avatar" width="32" height="32"/>
            {{ player.name }}
          </div>
        </li>
      </ul>
    </article>
  </section>
</template>

<style scoped lang="scss">

.release-buzzer {
  background: #d7acac;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  color: #c03f3f;
  fill: #c03f3f;

  & > svg {
    width: 16px;
    height: 16px;
  }
}

section.host-view {
  display: flex;
  flex-direction: column;
  gap: 2rem;

  h1 {
    margin-bottom: 1rem;
  }

  .player-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    list-style-type: none;
    max-height: calc(64px * 3 + 2rem * 2);
    overflow-x: auto;
  }

  .player {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    background-color: var(--DarkMode-Secondary-Box, #252525);
    border-radius: 8px;
    padding: 1rem;

    .player-info {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    img {
      border-radius: 50%;
    }

    &:not(.active) {
      order: 1;
    }

    &.active {
      background: #9747FF;
      color: white;
      order: 0;
    }

    button {
      height: 100%;
      border-radius: 8px;
      background: none;
      background: #d7acac;
      fill: #c03f3f;
      padding: 1rem;

      & > svg {
        width: 16px;
        height: 16px;
      }
    }
  }
}
</style>
