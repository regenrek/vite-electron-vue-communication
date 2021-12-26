import { ipcMain, ipcRenderer } from 'electron';
import log from 'electron-log';

export interface ILoggerApi {
    send: (level: number, message: string) => void;
}

export const loggerApi: ILoggerApi = {
    send(level: number, message: string) {
        ipcRenderer.send('log', level, message);
    },
};

export class Logger {
    init() {
        ipcMain.handle('log', (event, level, message) => {
            // log to file with electron-log
            (log as any)[level](message);
        });
    }
}