import type { Store } from 'vuex';
import type { IRootState } from '../../../types/vuex-shim';
import type { IElectronWindow } from './electron';
import { Electron } from './electron';
import type { DeepReadonly } from './util/readonly';

export interface IEnvironment {
    prompt(message: string, defaultValue?: string): Promise<string | null>;
    connectToStore(
        store: Store<DeepReadonly<IRootState>>
    ): void;
    init(): void
}

export function isElectron() {
    // Renderer process
    if (typeof window !== 'undefined' && typeof window.process === 'object' && (window.process as any).type === 'renderer') {
        return true;
    }

    // Main process
    if (typeof process !== 'undefined' && typeof process.versions === 'object' && !!process.versions.electron) {
        return true;
    }

    // Detect the user agent when the `nodeIntegration` option is set to true
    if (typeof navigator === 'object' && typeof navigator.userAgent === 'string' && navigator.userAgent.indexOf('Electron') >= 0) {
        return true;
    }

    return false;
}

function chooseEnv(): IEnvironment {
    const win = <IElectronWindow>(window as any);
    win.isElectron = isElectron();
    console.log('win: ', win.isElectron);
    if (((window as any) as IElectronWindow).isElectron) {
        return new Electron();
    }
    // if (window.navigator.msSaveOrOpenBlob !== undefined) {
    //     return new OldEdge();
    // }
    // return new Browser();

    throw new Error('No Environment found');
}

const envX = chooseEnv();

// (window as any).toast = envX;
export default envX;
