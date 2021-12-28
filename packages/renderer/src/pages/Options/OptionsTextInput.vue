
<script lang="ts" setup>
import {ref} from 'vue';
import Multiselect from '@vueform/multiselect';

const options = [
    'Batman',
    'Robin',
    'Joker',
];
        
const value = ref<string>('');
</script>

<template>
  <div>
    <label>
      Konfiguration
    </label>
    <Multiselect
      v-model="value"
      :close-on-select="true"
      :searchable="true"
      :create-option="true"
      :options="options"
    />

    <input
      type="text"
      value="test"
    >
  </div>
</template>

<style src="/@/styles/multiselect.css"></style>