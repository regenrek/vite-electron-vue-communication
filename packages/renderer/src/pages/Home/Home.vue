<script lang="ts" setup>
// import {useStage} from '/@/use/canvas/useStage';
import ToggleSidebar from '/@/components/ToggleSidebar.vue';
import Topbar from '/@/components/Topbar.vue';
import { Button } from 'ant-design-vue';
import ModalConfirm from '/@/components/Modal/src/ModalConfirm.vue';
// // useStage();
import { useModal } from '/@/components/Modal';
// import { ref } from 'vue';

const [register1, modal] = useModal();
// const modalVisible = ref<boolean>(false);
// const openTargetModal = () => {
//     modalVisible.value = true;
// };

function send() {
  modal.openModal(true, {
    data: 'content',
    info: 'Info',
  });
}

</script>
<template>
  <main class="min-h-screen flex">
    <div class="flex flex-col w-full">
      <Topbar />

      <ModalConfirm
        @register="register1"
      />
      <!-- 
      <Button
        type="primary"
        class="my-4"
        @click="openTargetModal"
      >
        Click me
      </Button> -->


      <Button
        type="primary"
        class="my-4"
        @click="send"
      >
        send
      </Button>

      <!-- <div class="flex-1 overflow-x-hidden overflow-y-hidden">
        <div
          id="konva-container"
          class="konva-container bg-white dark:bg-true-gray-900"
        />
      </div> -->
    </div>
    <ToggleSidebar />
  </main>
</template>