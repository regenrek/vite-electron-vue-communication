import { createSharedComposable, useToggle } from '@vueuse/core';
import defu from 'defu';
import { ref } from 'vue';

export const useSidebarPanel = (options?: any) => createSharedComposable(() => {
    const opts = defu(options, {
        isOpen: true,
    });

    const isOpen = ref(opts);
    const toggle = useToggle(isOpen);

    return { isOpen, toggle };
});