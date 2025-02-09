<script setup lang="ts">
import {ref} from "vue";
import BuzzzedCarrouselSelect from "@/components/BuzzzedCarrouselSelect.vue";
import IconSpeaker from "@/components/icons/IconSpeaker.vue";
import {useBuzzzedStore} from "@/stores/buzzzed";
import {useSounds} from "@/composables/useSounds";
import {useAvatars} from "@/composables/useAvatars";
import {useRouter} from "vue-router";

const userName = ref("");
const avatar = ref(0);
const buzzerSound = ref(0);
const buzzzedStore = useBuzzzedStore();
const router = useRouter();
const { avatars } = useAvatars()
const { sounds, getSound } = useSounds();

if (buzzzedStore.roomId === '') {
  router.push('/');
}

function handleFormSubmit(e: Event) {
  e.preventDefault();
}

function handleUserNameUpdate(event: Event) {
  const target = event.target as HTMLInputElement;
  userName.value = target.value;
}

function handleAvatarUpdate(updatedAvatar: number) {
  avatar.value = updatedAvatar;
}

function handleBuzzerSoundUpdate(updatedBuzzerSound: number) {
  buzzerSound.value = updatedBuzzerSound;
}

function isFormValid() {
  return userName.value.length > 0;
}

function joinRoom() {
  if (isFormValid()) {
    buzzzedStore.joinRoom(
      userName.value,
      avatar.value,
      {soundId: buzzerSound.value, id: Math.random().toString(36).slice(7)}
    );
  }
}

function playSound() {
  const soundFile = getSound(buzzerSound.value)?.file;
  const audio = new Audio(`/sounds/${soundFile}`);
  audio.play().catch(console.error);
}
</script>

<template>
  <section class="configure-buzzer">
    <div class="configure-buzzer__container">
      <h1 class="configure-buzzer__container__title">Qui es-tu ?</h1>
      <form autocomplete="off" novalidate @submit="handleFormSubmit" class="configure-buzzer__container__form">
        <div>
          <input @input="handleUserNameUpdate" id="pseudo" type="text" placeholder="Pseudo"/>
        </div>
        <div>
          <buzzzed-carrousel-select @choice:update="handleAvatarUpdate" :choices="avatars">
            <img :src="`/avatars/${avatars[avatar]}`" alt="Avatar" width="56" height="56"/>
          </buzzzed-carrousel-select>
        </div>
        <div>
          <buzzzed-carrousel-select @choice:update="handleBuzzerSoundUpdate" :choices="sounds">
            <div class="selected-sound">
              <icon-speaker class="speaker-icon" @click="playSound()"/>
              {{ sounds[buzzerSound].name }}
            </div>
          </buzzzed-carrousel-select>
        </div>
        <div class="configure-buzzer__welcome-message__form__buttons">
          <button id="join" type="submit" @click="joinRoom()" :disabled="!isFormValid()">Let's Gooo !</button>
        </div>
      </form>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.error {
  display: inline-block;
  color: #e83f3f;
  font-weight: normal;
  margin-top: 0.25rem;
}

.speaker-icon {
  cursor: pointer;
}

.configure-buzzer {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  max-width: 320px;
  padding: 0.5rem;
  gap: 2rem;

  &__container {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;

    &__title {
      font-size: 2rem;
      font-weight: bold;
      padding: 2rem 0;
    }

    &__form {
      display: flex;
      flex-direction: column;
      gap: 1rem;

      &__buttons {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }
    }
  }
}

.selected-sound {
  display: flex;
  align-items: center;
  gap: 1rem;

  & > svg {
    width: 24px;
    height: 24px;
    fill: white;
  }
}
</style>
