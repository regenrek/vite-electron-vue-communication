<template>
  <Modal v-model:visible="visible">
    <template #title>
      Header
    </template>
    <template #default>
      Body
    </template>
  </Modal>
</template>
<script lang="ts" setup>
import { Modal } from 'ant-design-vue';
import { ref } from 'vue';


const visible = ref<boolean>(true);
// import { computed, unref } from 'vue';

//   export default defineComponent({
//     name: 'BasicModal',
//     components: { Modal, ModalWrapper, ModalClose, ModalFooter, ModalHeader },
//     inheritAttrs: false,
//     props: basicProps,
//     emits: ['visible-change', 'height-change', 'cancel', 'ok', 'register'],
//     setup(props, { emit, attrs }) {
//       // modal component does not need title
//       const getProps = computed(
//         (): ModalProps => {
//           const opt = {
//             ...unref(getMergeProps),
//             visible: unref(visibleRef),
//             title: undefined,
//           };
//           return {
//             ...opt,
//             wrapClassName: unref(getWrapClassName),
//           };
//         }
//       );

// const getBindValue = computed(
// (): Recordable => {
//     const attr = { ...attrs, ...unref(getProps) };
//     // if (unref(fullScreenRef)) {
//     // return omit(attr, 'height');
//     // }
//     return attr;
// },
// );
//     })
</script>
<style lang="">
    
</style>