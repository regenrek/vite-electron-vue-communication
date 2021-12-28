<script lang="ts" setup>
import {useCanvasLayer} from '/@/use/canvas/useCanvasLayer';
import {useStage} from '/@/use/canvas/useStage';
import { onMounted } from 'vue';

const { canvasLayer } = useCanvasLayer();
const { initStage } = useStage();
let stage;

onMounted(() => {
  stage = initStage();
  stage.add(canvasLayer);
});
</script>
<template>
  <main class="min-h-screen">
    Test
    <div
      id="konva-container"
      class="konva-container bg-white dark:bg-true-gray-900"
    />
  </main>
</template>