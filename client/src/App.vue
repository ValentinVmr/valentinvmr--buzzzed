<script lang="ts" setup>
import { socket } from "@/socket";
import { useConnectionStore } from "@/stores/connection";
import { useBuzzzedStore } from "@/stores/buzzzed";


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
</template>

<style lang="scss">
@import "assets/fonts";
@import "assets/_base";

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
