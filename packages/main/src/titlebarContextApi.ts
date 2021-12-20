import type { TitlebarContextApi } from './titlebarContext';

declare global {
    interface Window {
        electron_window: any;
    }
}

const context: TitlebarContextApi = window.electron_window.titlebar;

export default context;