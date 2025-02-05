<script lang="ts" setup>

import BuzzzedRoomCode from "@/components/BuzzzedRoomCode.vue";
import {useBuzzzedStore} from "@/stores/buzzzed";
import {useAvatars} from "@/composables/useAvatars";
import IconTimes from "@/components/icons/IconTimes.vue";
import {useSounds} from "@/composables/useSounds";
import {computed, watch} from "vue";
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
  return buzzzedStore.playerWhoBuzzed.name === player.name;
}

function releaseBuzzer() {
  buzzzedStore.dropBuzzer();
}

watch(playerRef, (value, oldValue) => {

  if (buzzzedStore.name !== value.name) {
    playPlayerSound(value.soundId);
  }
}, { deep: true });

function playPlayerSound(soundId: number) {
  const sound = getSound(soundId);
  const audio = new Audio(`/sounds/${sound.file}`);
  audio.play().catch(console.error);
}
</script>

<template>
  <section class="host-view">
    <article>
      <h1>ID de la salle</h1>
      <buzzzed-room-code/>
    </article>

    <article v-if="hasOnePLayerInRoom()">
      <h1>Joueur.euse.s</h1>
      <ul>
        <li class="player" :class="{ active: isPlayerActive(player)}" v-for="player in getPlayers()">
          <div class="player-info">
            <img :src="`/avatars/${getAvatar(player.avatar)}`" alt="Avatar" width="56" height="56"/>
            {{ player.name }}
          </div>
          <div>
            <button v-if="isPlayerActive(player)" @click="releaseBuzzer()">
              <IconTimes />
            </button>
          </div>
        </li>
      </ul>
    </article>
  </section>
</template>

<style scoped lang="scss">

section.host-view {
  display: flex;
  flex-direction: column;
  gap: 2rem;

  h1 {
    margin-bottom: 1rem;
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

    &.active {
      background: #9747FF;
      color: white;
    }

    button {
      height: 100%;
      border-radius: 8px;
      background: none;
      background: #d7acac;
      fill: #c03f3f;
      padding: 1rem;

      & > svg {
        width: 24px;
        height: 24px;
      }
    }
  }
}
</style>
