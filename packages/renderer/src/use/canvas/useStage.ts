import { Stage } from 'konva/lib/Stage';
import type { StageConfig, Stage as TStage } from 'konva/lib/Stage';
import { useWindowSize } from '@vueuse/core';
import { watch, onMounted } from 'vue';
import { useCanvasLayer } from '/@/use/canvas/useCanvasLayer';

const { canvasLayer } = useCanvasLayer();

export function useStage() {
    // const canvasWidth: number = window.innerWidth - 215;
    const canvasWidth: number = window.innerWidth;
    const canvasHeight: number = window.innerHeight;
    const { height, width } = useWindowSize();
    let stage: TStage;

    const stageDefaultConfig: StageConfig = {

        draggable: true,
        container: 'konva-container',
        width: canvasWidth,
        height: canvasHeight,
    };

    onMounted(() => {
        stage = initStage();
        stage.add(canvasLayer);
    });

    watch(height, () => {
        stage.height(height.value);
    });

    watch(width, () => {
        stage.width(width.value);
        stage.clear();
        stage.draw();
    });

    const initStage = (config?: StageConfig) => {
        stage = new Stage(config || stageDefaultConfig);
        return stage;
    };

    // const resizeStage = (stage: Stage) => {
    //     const { height, width } = useWindowSize();
    //     stage.width(width.value);
    //     stage.height(height.value);

    //     console.log('resize to: ', height.value, width.value);
    // };

    // const computeDimensions = (heightToWidthRatio: number) => {
    //     const windowHeight =
    //         window.innerHeight && document.documentElement.clientHeight
    //             ? Math.min(window.innerHeight, document.documentElement.clientHeight)
    //             : window.innerHeight ||
    //             document.documentElement.clientHeight ||
    //             document.getElementsByTagName('body')[0].clientHeight;
    //     const height = Math.min(props.width * heightToWidthRatio, windowHeight * 0.95);
    //     const width = height * (1 / heightToWidthRatio);
    //     return { width, height };
    // };

    // const resizeStage = () => {
    //     const { width: newWidth, height: newHeight } = computeDimensions(
    //       1080 / 1920,
    //     );
    //     stage.width(newWidth);
    //     stage.height(newHeight);
    //   };
    //   watch(() => props.width, resizeStage);

    return {
        initStage,
        stageDefaultConfig,
    };
}