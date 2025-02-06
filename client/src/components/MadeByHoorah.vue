<script setup lang="ts">
import HoorahLogo from "@/components/HoorahLogo.vue";
</script>


<template>
  <footer>
    <p>Made with ❤️ by</p>
    <a href="https://hoorah.fr/">
      <HoorahLogo/>
    </a>
  </footer>
</template>

<style lang="scss" scoped>

footer {
  transform: scale(0.75);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  color: #e5e5e5;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;

  position: fixed;
  bottom: 0;

  svg {
    fill: #e5e5e5;
    height: 34px;
  }
}

</style>
