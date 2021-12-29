import { vi } from "vitest";

export function mockPrototype() {
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

        require('canvas')

        return getContext2D.internal.call(this, type);
    });

    // getContext2D.internal = HTMLCanvasElement.prototype.getContext;

    if (!vi.isMockFunction(HTMLCanvasElement.prototype.getContext)) {
        getContext2D.internal = HTMLCanvasElement.prototype.getContext;
    } else {
        getContext2D.internal = HTMLCanvasElement.prototype.getContext.internal;
    }
    console.log("mock window")

    HTMLCanvasElement.prototype.getContext = getContext2D;
}