<template>
  <img
    alt="Vue logo"
    src="../assets/logo.svg"
    width="300"
  >
  <app-navigation />
  <router-view />
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import AppNavigation from '/@/components/AppNavigation.vue';
import tcmCore from '../../core/src/index';

export default defineComponent({
  name: 'App',
  components: {
    AppNavigation,
  },
  async created(): Promise<void> {
    //(window as any).store = this.$store;

    console.log('store', this.$store);

    //tcmCore.connectToStore(this.$store);
    tcmCore.prompt('test');
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
