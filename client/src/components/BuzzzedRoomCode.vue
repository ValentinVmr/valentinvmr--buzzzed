<script lang="ts" setup>
import {useBuzzzedStore} from "@/stores/buzzzed";
import IconCopy from "@/components/icons/IconCopy.vue";
import {useNotification} from "@kyvg/vue3-notification";
import {ref} from "vue";
import IconEyeOff from "@/components/icons/IconEyeOff.vue";
import IconEye from "@/components/icons/IconEye.vue";

const buzzzedStore = useBuzzzedStore();
const notification = useNotification();
const isRoomCodeVisible = ref(false);

function getRoomCode() {
  if (!buzzzedStore.roomId) {
    return "";
  }

  if (!isRoomCodeVisible.value) {
    return buzzzedStore.roomId.replaceAll(/[a-zA-Z0-9]/g, "•");
  }

  return buzzzedStore.roomId;
}

function copyRoomId() {
  navigator.clipboard.writeText(buzzzedStore.roomId);
  notification.notify("Code copié dans le presse papier");
}

function getEyeComponent() {
  return isRoomCodeVisible.value ? IconEye : IconEyeOff;
}

function showCode() {
  isRoomCodeVisible.value = !isRoomCodeVisible.value;
}
</script>

<template>
  <section class="buzzzed-room-code">
    <div class="room-code">
      {{ getRoomCode() }}
    </div>
    <div class="actions">
      <IconCopy @click="copyRoomId()" />
      <component @click="showCode()" :is="getEyeComponent()" />
    </div>
  </section>
</template>

<style scoped lang="scss">
.buzzzed-room-code {
  display: flex;
  align-items: center;
  justify-content: space-between;

  background: var(--DarkMode-Secondary-Text);
  border-radius: 8px;
  width: calc(320px - 2rem);
  padding: 1rem;
  height: 64px;

  .room-code {
    font-size: 1.5rem;
    font-weight: 500;
    color: var(--DarkMode-Secondary-Box);
  }

  .actions {
    display: flex;
    gap: 0.125rem;

    & > svg {
      cursor: pointer;
      width: 24px;
      height: 24px;
    }
  }
}
</style>
