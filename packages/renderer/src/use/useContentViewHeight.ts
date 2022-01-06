import { ref, computed, unref } from 'vue';
//import { createPageContext } from '/@/hooks/component/usePageContext';
import { useWindowSize } from '@vueuse/core';
export const headerHeightRef = ref(0);

export function useContentViewHeight() {
    const contentHeight = ref(window.innerHeight);
    const pageHeight = ref(window.innerHeight);
    const getViewHeight = computed(() => {
        return unref(contentHeight) - unref(headerHeightRef) || 0;
    });

    const winSize = useWindowSize(
        {
            window,
            initialWidth: window.innerWidth,
            initialHeight: window.innerHeight,
        },
    );

    async function setPageHeight(height: number) {
        pageHeight.value = height;
    }

    return {
        setPageHeight,
        getViewHeight,
        winSize,
    };
}