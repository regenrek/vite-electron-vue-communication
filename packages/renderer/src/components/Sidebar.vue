<script lang="ts" setup>

const props = defineProps({
  mode: {
    type: [String],
    required: true,
  },
});

</script>

<template>
  <aside
    class="min-h-screen bg-true-gray-900 border-l border-true-gray-700 flex-shrink-0"
    :class="[props.mode === 'closed' ? 'w-[40px]' : 'w-[215px]']"
  >
    Mode: {{ props.mode }}
    <slot name="header" />
    <slot />
  </aside>
</template>