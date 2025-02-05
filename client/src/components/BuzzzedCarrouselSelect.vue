<script lang="ts" setup>
import {PropType, ref} from "vue";
import IconLeftArrow from "@/components/icons/IconLeftArrow.vue";
import IconRightArrow from "@/components/icons/IconRightArrow.vue";

const props = defineProps({
  choices: {
    type: Array as PropType<string[]>,
    default: [],
  },
});

const selectedChoice = ref(0);

const $emits = defineEmits(["choice:update"]);

function selectAvatar(index: number) {
  selectedChoice.value = index;
}

function choosePreviousAvatar() {
  if (selectedChoice.value === 0) {
    selectAvatar(props.choices.length - 1);
  } else {
    selectAvatar(selectedChoice.value - 1);
  }

  emitUpdatedAvatar();
}

function chooseNextAvatar() {
  selectedChoice.value = (selectedChoice.value + 1) % props.choices.length;

  emitUpdatedAvatar();
}

function emitUpdatedAvatar() {
  $emits("choice:update", selectedChoice.value);
}
</script>

<template>
  <section class="buzzzed-choice">
    <icon-left-arrow class="arrow white" id="left-arrow" @click="choosePreviousAvatar()"/>
    <div class="buzzzed-choice__current-choice">
      <slot />
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
