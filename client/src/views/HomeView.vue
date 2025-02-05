<script setup lang="ts">
import BuzzzedLogo from '@/components/BuzzzedLogo.vue'
import { ref } from 'vue'
import { useBuzzzedStore } from "@/stores/buzzzed";

const roomDoesNotExists = ref(undefined)
const roomCode = ref('')
const buzzzedStore = useBuzzzedStore();

function handleFormSubmit (e: Event) {
  e.preventDefault();
}

function handleRoomJoin() {
  buzzzedStore.checkRoomExists(roomCode.value.toLowerCase());
}

function handleCreateRoom() {
  buzzzedStore.createRoom()
}

function handleRoomCodeUpdate (event: Event) {
  const target = event.target as HTMLInputElement
  roomCode.value = target.value
}


</script>

<template>
  <section class="home">
    <buzzzed-logo/>
    <div class="home__welcome-message">
      <h1 class="home__welcome-message__title">Hey !</h1>
      <p class="home__welcome-message__text">
        Bienvenue sur Buzzzed <br>
        Pour commencer, entrez le code de la partie
      </p>
    </div>
    <form autocomplete="off" novalidate @submit="handleFormSubmit" class="home__welcome-message__form">
      <div>
        <input autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" @change="handleRoomCodeUpdate" id="room-code" type="text" placeholder="Code de la partie"/>
        <span v-if="roomDoesNotExists === false" class="error">La salle n'existe pas.</span>
      </div>
      <div class="home__welcome-message__form__buttons">
        <button id="join" @click="handleRoomJoin()" type="submit">Rejoindre</button>
        <button id="create" @click="handleCreateRoom()" type="submit">Ou créer une salle</button>
      </div>
    </form>
  </section>
</template>

<style lang="scss" scoped>
.error {
  display: inline-block;
  color: #e83f3f;
  font-weight: normal;
  margin-top: 0.25rem;
}

.home {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  max-width: 320px;
  padding: 0.5rem;

  &__welcome-message {
    padding: 2rem 0;

    display: flex;
    flex-direction: column;
    gap: 1.25rem;

    &__title {
      font-size: 2rem;
      font-weight: bold;
    }

    &__text {
      text-align: center;
      font-weight: lighter;
    }

    &__form {
      display: flex;
      flex-direction: column;
      gap: 1rem;

      &__buttons {
        display: flex;
        flex-direction: column;
        gap: 1rem
      }

      #create {
        background: none;
        font-weight: bold;
        color: var(--DarkMode-Secondary-Text, #EAEAEA);
        position: relative;

        &::before, &::after {
          content: '';
          width: 10%;
          height: 2px;
          background: var(--DarkMode-Secondary-Text, #EAEAEA);
          display: block;
          position: absolute;
          top: 50%;
        }

        &::before{
          left: 0;
        }

        &::after{
          right: 0;
        }
      }
    }
  }
}
</style>
