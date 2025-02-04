<script lang="ts" setup>
import {ref} from "vue";
import IconLeftArrow from "@/components/icons/IconLeftArrow.vue";
import IconRightArrow from "@/components/icons/IconRightArrow.vue";

const avatars = [
  "little-face-56.png",
  "spinned-face-56.png",
  "square-face-56.png",
]

const selectedAvatar = ref(0);

const $emits = defineEmits(["avatar:update"]);

function selectAvatar(index: number) {
  selectedAvatar.value = index;
}

function choosePreviousAvatar() {
  if (selectedAvatar.value === 0) {
    selectAvatar(avatars.length - 1);
  } else {
    selectAvatar(selectedAvatar.value - 1);
  }

  emitUpdatedAvatar();
}

function chooseNextAvatar() {
  selectedAvatar.value = (selectedAvatar.value + 1) % avatars.length;

  emitUpdatedAvatar();
}

function emitUpdatedAvatar() {
  $emits("avatar:update", selectedAvatar.value);
}
</script>

<template>
  <section class="buzzzed-choice">
    <icon-left-arrow class="arrow white" id="left-arrow" @click="choosePreviousAvatar()"/>
    <div class="buzzzed-choose-avatar__avatars">
      <img :src="`/avatars/${avatars[selectedAvatar]}`" alt="Avatar" width="56" height="56"/>
    </div>
    <icon-right-arrow class="arrow white" id="right-arrow" @click="chooseNextAvatar()"/>
  </section>
</template>


<style lang="scss" scoped>
.white {
  fill: white;
}

.buzzzed-choice {
  position: relative;
  border-radius: 8px;
  background-color: var(--DarkMode-Secondary-Box, #252525);
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;

  &__avatars {
    & > img {
      border-radius: 50%;
    }
  }

  .arrow {
    $size: 56px;
    position: absolute;

    width: $size;
    height: $size;
    cursor: pointer;

    top: calc(50% - ($size / 2));

    &#left-arrow {
      left: 0;
    }

    &#right-arrow {
      right: 0;
    }
  }

}
</style>
