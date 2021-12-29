import { install, isVue2, Vue2 } from 'vue-demi'
import './polyfillFetch'
import './polyfillPointerEvents'
import { vitest, beforeEach, vi } from 'vitest'
// require('jest-canvas-mock/lib/window')
import CanvasRenderingContext2D from 'jest-canvas-mock/lib/classes/CanvasRenderingContext2D'
//HTMLCanvasElement.prototype.getContext = vi.fn(() => 0)

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

function mockPrototype() {
    /**
     * This weakmap is designed to contain all of the generated canvas contexts. It's keys are the
     * jsdom canvases obtained by using the `this` keyword inside the `#getContext('2d')` function
     * call. It's values are the generated `CanvasRenderingContext2D` objects.
     */
    const generatedContexts = new WeakMap();
    /**
     * Overrides getContext. Every test run will create a new function that overrides the current
     * value of getContext. It attempts to preserve the original getContext function by storing it on
     * the callback as a property.
     */

    const getContext2D = vi.fn((type) => {
        // if (type === '2d') {
        //     /**
        //      * Contexts must be indempotent. Once they are generated, they should be returned when
        //      * getContext() is called on the same canvas object multiple times.
        //      */
        //     console.log("in 2d")
        //     if (generatedContexts.has(this)) return generatedContexts.get(this);
        //     console.log("after in 2d")
        //     const ctx = new CanvasRenderingContext2D(this);
        //     generatedContexts.set(this, ctx);
        //     return ctx;
        // }

        // try {
        //     if (!this.dataset.internalRequireTest) require('canvas');
        // } catch (_unused) {
        //     return null;
        // }

        return getContext2D.internal.call(this, type);
    });

    // getContext2D.internal = HTMLCanvasElement.prototype.getContext;

    if (!vi.isMockFunction(HTMLCanvasElement.prototype.getContext)) {
        getContext2D.internal = HTMLCanvasElement.prototype.getContext;
    } else {
        getContext2D.internal = HTMLCanvasElement.prototype.getContext.internal;
    }

    HTMLCanvasElement.prototype.getContext = getContext2D;

    console.log("b", HTMLCanvasElement.prototype.getContext("2d"))
}


const mockWindow = (win) => {
    const d = win.document;
    const f = win.document.createElement;

    win.CanvasRenderingContext2D = win.CanvasRenderingContext2D || CanvasRenderingContext2D

    // console.log("aa", window.CanvasRenderingContext2D, HTMLCanvasElement.prototype.getContext)

    mockPrototype()

    return win;
}


setupVueSwitch()

beforeEach(() => {
    console.log("run into testing......")

    // console.log("aa", window.CanvasRenderingContext2D, HTMLCanvasElement.prototype.getContext)

    if (typeof window !== 'undefined') {
        global.window = mockWindow(window)
    }

    createLocalStorage()
    document.body.innerHTML = ''
    document.head.innerHTML = '<div id="konva-container"></div>'
})
