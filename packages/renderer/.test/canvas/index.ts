
import { mockWindow } from './window'

function mockCanvas(window: any) {
    if (typeof window !== 'undefined') {
        global.window = mockWindow(window)
    }
}

export { mockWindow, mockCanvas }