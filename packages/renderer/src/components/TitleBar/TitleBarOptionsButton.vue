<template>
  <router-link
    draggable="false"
    class="btn-title-bar win-icon"
    :to="{name: 'Options'}"
    title="Über"
    aria-label="Über"
  >
    <i class="icon-info" />
  </router-link>
</template>

<style scoped>
@import "btn-titlebar.css";
</style>
