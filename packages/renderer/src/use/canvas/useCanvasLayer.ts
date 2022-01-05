import { Layer } from 'konva/lib/Layer';
import { Rect } from 'konva/lib/shapes/Rect';

export function useCanvasLayer() {
    const canvasLayer: Layer = new Layer();
    const rect: Rect = new Rect({
        fill: 'red',
        height: 10,
        width: 10,
        x: 10,
        y: 10,
    });

    const bg: Rect = new Rect({
        fill: '#333',
        height: 954,
        width: 1533,
        stroke: '#ff0000',
        x: 0,
        y: 0,
    });

    canvasLayer.add(bg);
    canvasLayer.add(rect);


    return {
        canvasLayer,
    };
}