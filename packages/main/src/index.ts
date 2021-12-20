import type { MenuItemConstructorOptions } from 'electron';
import {app, BrowserWindow, shell, ipcMain, Menu } from 'electron';
import {join} from 'path';
import {URL} from 'url';
import './security-restrictions';
// import context from './titlebarContextApi';
// import titlebarContext from './titlebarContextApi'

const registerTitlebarIpc = () => {
  ipcMain.handle('open-url', (e, url) => {
    shell.openExternal(url);
  });
};

// const openUrl = () => {
//   titlebarContext.openModal("https://www.google.at")
// }

const isMac = process.platform === 'darwin';


const template: MenuItemConstructorOptions[] = [
  ...(isMac
    ? [
      {
        label: app.name,
        submenu: [
          { role: 'about', label: 'Über Tipico Multicast Server' },
          { label: `Version ${app.getVersion()}`, enabled: false },
          {
            label: 'Nach Updates suchen',
            enabled: true,
            click: () => function () {
              return false;
            },
          },
          { type: 'separator' },
          { role: 'quit', label: 'Tipico Multicast Client beenden' },
        ],
      } as MenuItemConstructorOptions,
    ]
    : []),
  {
    label: 'Ansicht',
    submenu: [
      { role: 'reload', label: 'Neu laden' },
      { role: 'forceReload', label: 'Neu laden erzwingen' },
      { type: 'separator' },
      { role: 'togglefullscreen', label: 'Vollbild umschalten' },
    ],
  } as MenuItemConstructorOptions,
  ...(!isMac
    ? [
      {
        label: 'Hilfe',
        submenu: [
          { role: 'about', label: 'Über Tipico Multicast Server' },
          { label: `Version ${app.getVersion()}`, enabled: false },
          {
            label: 'Nach Updates suchen',
            enabled: true,
            click: () => openUrl(),
          },
        ],
      } as MenuItemConstructorOptions,
    ]
    : []),
];

Menu.setApplicationMenu(Menu.buildFromTemplate(template));

const isSingleInstance = app.requestSingleInstanceLock();
const isDevelopment = import.meta.env.MODE === 'development';

if (!isSingleInstance) {
  app.quit();
  process.exit(0);
}

app.disableHardwareAcceleration();

// Install "Vue.js devtools"
if (isDevelopment) {
  app.whenReady()
    .then(() => import('electron-devtools-installer'))
    .then(({default: installExtension, VUEJS3_DEVTOOLS}) => installExtension(VUEJS3_DEVTOOLS, {
      loadExtensionOptions: {
        allowFileAccess: true,
      },
    }))
    .catch(e => console.error('Failed install extension:', e));
}

let mainWindow: BrowserWindow | null = null;

const createWindow = async () => {
  mainWindow = new BrowserWindow({
    show: false, // Use 'ready-to-show' event to show window
    webPreferences: {
      nativeWindowOpen: true,
      webviewTag: false, // The webview tag is not recommended. Consider alternatives like iframe or Electron's BrowserView. https://www.electronjs.org/docs/latest/api/webview-tag#warning
      preload: join(__dirname, '../../preload/dist/index.cjs'),
    },
  });

  registerTitlebarIpc(mainWindow);

  /**
   * If you install `show: true` then it can cause issues when trying to close the window.
   * Use `show: false` and listener events `ready-to-show` to fix these issues.
   *
   * @see https://github.com/electron/electron/issues/25012
   */
  mainWindow.on('ready-to-show', () => {
    mainWindow?.show();

    if (isDevelopment) {
      mainWindow?.webContents.openDevTools();
    }
  });

  /**
   * URL for main window.
   * Vite dev server for development.
   * `file://../renderer/index.html` for production and test
   */
  const pageUrl = isDevelopment && import.meta.env.VITE_DEV_SERVER_URL !== undefined
    ? import.meta.env.VITE_DEV_SERVER_URL
    : new URL('../renderer/dist/index.html', 'file://' + __dirname).toString();


  await mainWindow.loadURL(pageUrl);
};



app.on('second-instance', () => {
  // Someone tried to run a second instance, we should focus our window.
  if (mainWindow) {
    if (mainWindow.isMinimized()) mainWindow.restore();
    mainWindow.focus();
  }
});


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});


app.whenReady()
  .then(createWindow)
  .catch((e) => console.error('Failed create window:', e));


// Auto-updates
if (import.meta.env.PROD) {
  app.whenReady()
    .then(() => import('electron-updater'))
    .then(({autoUpdater}) => autoUpdater.checkForUpdatesAndNotify())
    .catch((e) => console.error('Failed check updates:', e));
}

