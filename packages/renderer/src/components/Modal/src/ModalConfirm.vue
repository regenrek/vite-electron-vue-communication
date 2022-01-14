<template>
  <BasicModal
    v-bind="$attrs"
    title="Modal Title"
    :help-message="['提示1', '提示2']"
    @register="register"
  >
    <Button
      type="primary"
      class="mr-2"
      @click="closeModal"
    >
      从内部关闭弹窗
    </Button>

    <Button
      type="primary"
      @click="setModalProps"
    >
      从内部修改title
    </Button>
  </BasicModal>
</template>
<script lang="ts">
  import { Button } from 'ant-design-vue';
  import { defineComponent } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  export default defineComponent({
    components: { BasicModal, Button },
    setup() {
      const [register, { closeModal, setModalProps }] = useModalInner();
      return {
        register,
        closeModal,
        setModalProps: () => {
          setModalProps({ title: 'Modal New Title' });
        },
      };
    },
  });
</script>
