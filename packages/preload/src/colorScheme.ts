import type {NativeTheme} from 'electron';
import {contextBridge, ipcRenderer} from 'electron';
import { IpcChannels } from '/@shared/ipcChannels';
import log from 'electron-log';


contextBridge.exposeInMainWorld(
  'colorScheme',
  {
    set: (scheme: NativeTheme['themeSource']): Promise<void> => {
      log.info('Scheme Change: ', IpcChannels.ColorScheme, scheme);
      return ipcRenderer.invoke(IpcChannels.ColorScheme, scheme);
    },
    get: (): Promise<NativeTheme['themeSource']> => {
      log.info('Scheme Get: ', IpcChannels.ColorScheme);
      return ipcRenderer.invoke(IpcChannels.ColorScheme);
    },
  },
);
