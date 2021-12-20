import { BrowserWindow, ipcRenderer } from 'electron';

const titlebarContext = {
    open_url(url: string) {
        ipcRenderer.invoke('open-url', url);
    },

    onOpenModal() {
        ipcRenderer.on('openModal', (_e: any, name: string) => {
            return name;
        });

        return false;
    },

    openModal(name: string) {
        for (const window of BrowserWindow.getAllWindows()) {
            // window.webContents.send("logger-logged", logText);
            window.webContents.send('openModal', name);
        }
    },
};

export type TitlebarContextApi = typeof titlebarContext;

export default titlebarContext;