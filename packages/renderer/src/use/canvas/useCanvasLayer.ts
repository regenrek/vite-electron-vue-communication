import { Layer } from 'konva/lib/Layer';
import { Rect } from 'konva/lib/shapes/Rect';

export function useCanvasLayer() {
    const canvasLayer: Layer = new Layer();
    const rect: Rect = new Rect({
        fill: 'red',
        height: 500,
        width: 500,
        x: 10,
        y: 10,
    });

    canvasLayer.add(rect);

    return {
        canvasLayer,
    };
}