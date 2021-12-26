// import eventBus, { ShowMessageEvent } from '/@/eventbusc';
import type { Store } from 'vuex';
import type { IEnvironment } from '.';
import type { IRootState } from '../../../types/vuex-shim';
import type { DeepReadonly } from './util/readonly';
import { ipcRenderer } from 'electron';
import log from 'electron-log';

export interface Settings {
    darkMode?: boolean;
}

export interface IElectronWindow {
    isElectron: boolean;
    ipcRenderer: IpcRenderer;
}

// declare let window: Window & typeof globalThis;

export class Electron implements IEnvironment {

    private $store: Store<DeepReadonly<IRootState>> | null = null;
    private readonly electron = <IElectronWindow>(window as any);

    constructor() {
        log.info('test');
        ipcRenderer.on('push-message', () => {
            log.info('in push-message');
            // console.log(message);
            // eventBus.fire(new ShowMessageEvent(message));
        });
    }

    public readonly savingEnabled: boolean = true;

    public init() {
        return 'init';
    }

    public async saveSettings(settings: Settings): Promise<void> {
        await this.electron.ipcRenderer.sendConvo(
            'config.set',
            'darkMode',
            settings.darkMode ?? undefined,
        );
    }

    public async prompt(
        message: string,
        defaultValue?: string,
    ): Promise<string | null> {
        return await this.electron.ipcRenderer.sendConvo(
            'show-prompt',
            message,
            defaultValue,
        );
    }

    public connectToStore(
        store: Store<DeepReadonly<IRootState>>,
    ) {
        log.info('oki');
        this.$store = store;
    }
}

interface IpcRenderer {
    on(channel: string, listener: (...args: any[]) => void): void;

    onConversation(channel: string, listener: (...args: any[]) => void): void;

    send(channel: string, ...args: any[]): void;

    sendConvo<T>(channel: string, ...args: any[]): Promise<T>;
}