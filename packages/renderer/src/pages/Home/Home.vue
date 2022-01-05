<script lang="ts" setup>
import {useCanvasLayer} from '/@/use/canvas/useCanvasLayer';
import {useStage} from '/@/use/canvas/useStage';
import { onMounted } from 'vue';
import ToggleSidebar from '/@/components/ToggleSidebar.vue';
import Topbar from '/@/components/Topbar.vue';

const { canvasLayer } = useCanvasLayer();
const { initStage } = useStage();

//const { sidebar } = useSidebar();
let stage;

onMounted(() => {
  stage = initStage();
  stage.add(canvasLayer);
});
</script>
<template>
  <main class="min-h-screen flex">
    <div class="flex flex-col w-full">
      <Topbar />
      <div class="flex-1 overflow-x-hidden overflow-y-hidden">
        <div
          id="konva-container"
          class="konva-container bg-white dark:bg-true-gray-900"
        />
      </div>
    </div>
    <ToggleSidebar />
  </main>
</template>