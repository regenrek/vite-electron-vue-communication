<script lang="ts" setup>
import {useToggle} from '@vueuse/core';
import Sidebar from '/@/components/Sidebar.vue';
const [value, toggle] = useToggle(true);

</script>
<template>
  <Sidebar :mode="value ? 'open': 'closed'">
    <template #header>
      <div class="border-b border-b-true-gray-700 p-2">
        <button
          @click="toggle()"
        >
          <div class="flex flex-inline">
            <i class="icon-close" />
            <span>
              TV1
            </span>
          </div>
        </button>
      </div>
    </template>
    <template #default>
      <div v-if="value">
        Lorem ipsum
      </div>
    </template>
  </Sidebar>
</template>