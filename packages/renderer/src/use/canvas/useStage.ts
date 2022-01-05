import { Stage } from 'konva/lib/Stage';
import type { StageConfig } from 'konva/lib/Stage';

export function useStage() {
    // const canvasWidth: number = window.innerWidth - 215;
    const canvasWidth: number = window.innerWidth;
    const canvasHeight: number = window.innerHeight;

    const stageDefaultConfig: StageConfig = {
        draggable: true,
        container: 'konva-container',
        width: canvasWidth,
        height: canvasHeight,
    };

    const initStage = (config?: StageConfig) => {
        return new Stage(config || stageDefaultConfig);
    };

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