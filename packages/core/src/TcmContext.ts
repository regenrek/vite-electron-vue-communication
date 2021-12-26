import { BrowserWindow, ipcRenderer } from 'electron';

const tcmContext = {
    open_url(url: string) {
        ipcRenderer.send('open-url', url);
    },

    onOpenModal() {
        ipcRenderer.on('openModal', (_e: any, name: string) => {
            // console.log('receive openModal');
            return name;
        });

        return 'WELCOME FROM ELECTRON';
    },

    openModal(name: string) {
        for (const window of BrowserWindow.getAllWindows()) {
            // console.log('webcontents.send openModal');
            // window.webContents.send("logger-logged", logText);
            window.webContents.send('openModal', name);
        }
    },
};

export type TcmContextApi = typeof tcmContext;

export default tcmContext;