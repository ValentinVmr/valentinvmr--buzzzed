<script lang="ts" setup>
import {useBuzzzedStore} from "@/stores/buzzzed";
import IconCopy from "@/components/icons/IconCopy.vue";

const props = defineProps<{
  show: {
    type: Boolean,
    default: false
  }
}>();

const buzzzedStore = useBuzzzedStore();

function getRoomCode() {
  if (!buzzzedStore.roomId) {
    return "";
  }

  if (!props.show) {
    return buzzzedStore.roomId.replaceAll(/[a-zA-Z0-9]/g, "•");
  }

  return buzzzedStore.roomId;
}

function copyRoomId() {
  navigator.clipboard.writeText(buzzzedStore.roomId);
}
</script>

<template>
  <section class="buzzzed-room-code">
    <div class="room-code">
      {{ getRoomCode() }}
    </div>
    <div class="actions">
      <IconCopy @click="copyRoomId()" />
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
    & > svg {
      cursor: pointer;
    }
  }
}
</style>
