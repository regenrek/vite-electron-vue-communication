import { mockPrototype } from './prototype'
import CanvasRenderingContext2D from 'jest-canvas-mock/lib/classes/CanvasRenderingContext2D';

export function mockWindow(win: any) {
    const d = win.document;
    const f = win.document.createElement;

    win.CanvasRenderingContext2D = win.CanvasRenderingContext2D || CanvasRenderingContext2D
    mockPrototype()

    return win;
}