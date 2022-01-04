import { install, isVue2, Vue2 } from 'vue-demi'
import './polyfillFetch'
import './polyfillPointerEvents'
import { vitest, beforeEach, vi } from 'vitest'
global.jest = vi;
import getCanvasWindow from 'jest-canvas-mock/lib/window';
const apis = [
    'Path2D',
    'CanvasGradient',
    'CanvasPattern',
    'CanvasRenderingContext2D',
    'DOMMatrix',
    'ImageData',
    'TextMetrics',
    'ImageBitmap',
    'createImageBitmap',
] as const;

const canvasWindow = getCanvasWindow({ document: window.document });

apis.forEach((api) => {
    global[api] = canvasWindow[api];
    global.window[api] = canvasWindow[api];
});

const createLocalStorage = () => {
    let state: Record<string, any> = {}

    const localStorageMock: Storage = {
        getItem: vitest.fn(x => state[x]),
        setItem: vitest.fn((x, v) => state[x] = v),
        // @ts-ignore
        removeItem: vitest.fn((x, v) => delete state[x]),
        clear: vitest.fn(() => state = {}),
    }

    Object.defineProperty(window, 'localStorage', {
        value: localStorageMock,
    })
}

const setupVueSwitch = () => {
    if (isVue2) {
        Vue2.config.productionTip = false
        Vue2.config.devtools = false
        install(Vue2)
    }
}

setupVueSwitch()

beforeEach(() => {
    createLocalStorage()
    document.body.innerHTML = '<div id="konva-container"></div>'
})
