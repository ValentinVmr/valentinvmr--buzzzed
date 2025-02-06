<script lang="ts" setup>
import { socket } from "@/socket";
import { useConnectionStore } from "@/stores/connection";
import { useBuzzzedStore } from "@/stores/buzzzed";
import MadeByHoorah from "@/components/MadeByHoorah.vue";
import {Notifications} from "@kyvg/vue3-notification";


socket.off();
const connectionStore = useConnectionStore();
const buzzzedStore = useBuzzzedStore();

buzzzedStore.bindEvents();
connectionStore.bindEvents();

connectionStore.connect();

document.title = "Buzzzed";
</script>

<template>
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
  <MadeByHoorah />
  <notifications classes="notification" :max="2" position="top center" />
</template>

<style lang="scss">
@import "assets/fonts";
@import "assets/_base";

.notification {
  margin-top: 0.25rem;
  font-family: "Hanken Grotesk", Avenir, Helvetica, Arial, sans-serif;
  font-weight: 500;
  color: white;
  background: var(--DarkMode-Secondary-Box, #252525);
  border-radius: 50px;
  padding: 1rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  border: none;
  text-align: center;

  &.success {
    background: var(--DarkMode-Secondary-Box, #252525);
    border: none;
    text-align: center;
  }

  &.error {
    background: var(--DarkMode-Secondary-Box, #252525);
    border-left: 4px solid red;
    text-align: center;
  }
}

:root {
  --DarkMode-Primary-Text: #EAEAEA;
  --DarkMode-Secondary-Text: #919191;
  --DarkMode-Secondary-Box: #252525;
  --LightMode-Tertiary-Box: #EAEAEA
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Hanken Grotesk", Avenir, Helvetica, Arial, sans-serif;
}

#app {
  font-family: "Hanken Grotesk", Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  min-height: 100vh;
  min-width: 100vw;
  background: var(--DarkMode-Background, #101010);

  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
