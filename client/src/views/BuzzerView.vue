<script lang="ts" setup>
import {useBuzzzedStore} from "@/stores/buzzzed";
import {computed, watch} from "vue";
import {useSounds} from "@/composables/useSounds";
import {useRouter} from "vue-router";

const buzzzedStore = useBuzzzedStore();
const { getSound } = useSounds();
const playerRef = computed(() => buzzzedStore.playerWhoBuzzed);
const router = useRouter();

if (buzzzedStore.roomId === '') {
  router.push('/');
}

function isMyBuzzerLocked() {
  return buzzzedStore.isBuzzerLocked;
}

function isMyBuzzerSelected() {
  return buzzzedStore.name === buzzzedStore.playerWhoBuzzed.name;
}

function getBuzzerText() {
  if(isMyBuzzerLocked() && !isMyBuzzerSelected()) return 'Désactivé';
  if(isMyBuzzerSelected()) return 'Buzzzed';
  return 'Buzz';
}

function buzz() {
  if (!isMyBuzzerLocked()) {
    buzzzedStore.buzz();
  }
}

watch(playerRef, (value, oldValue) => {
    playPlayerSound(value.soundId);
}, { deep: true });

function playPlayerSound(soundId: number) {
  const sound = getSound(soundId);
  const audio = new Audio(`/sounds/${sound.file}`);
  audio.play().catch(console.error);
}
</script>

<template>
  <section class="buzzer">
    <button class="buzzer__container"
            @click="buzz"
            :disabled="isMyBuzzerLocked()"
            :class="{ locked: isMyBuzzerLocked() && !isMyBuzzerSelected(), active: isMyBuzzerSelected() }">
      <span class="buzzer__container__text">
        {{ getBuzzerText() }}
      </span>
    </button>
  </section>
</template>

<style lang="scss" scoped>
.buzzer {
  max-width: 320px;
  width: 100%;
  height: 80vh;
  padding: 2rem;
  touch-action: manipulation;

  &__container {
    width: 100%;
    height: 100%;
    background: #202020;
    text-transform: uppercase;
    border-radius: 16px;

    &__text {
      font-family: "Poppins", sans-serif;
      transform: rotateZ(90deg);
      font-size: 3rem;
      color: white;
      text-align: center;
      font-style: normal;
      font-weight: 800;
      line-height: normal;
      letter-spacing: 9.6px;
    }

    &:not([disabled]):active {
      background: #343434;
    }

    &[disabled] {
      background: #050505;
      cursor: initial;

      .buzzer__container__text {
        color: #202020;
      }
    }

    &[disabled].active {
      background: #9747FF;

      .buzzer__container__text {
        color: white;
      }
    }

    &.locked {

    }
  }
}
</style>
