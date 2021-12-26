/* eslint-disable @typescript-eslint/no-explicit-any */
import {contextBridge} from 'electron';

import type {BinaryLike} from 'crypto';
import {createHash} from 'crypto';
import tcmContext from '../../core/src/TcmContext';
import log from 'electron-log';

/**
 * The "Main World" is the JavaScript context that your main renderer code runs in.
 * By default, the page you load in your renderer executes code in this world.
 *
 * @see https://www.electronjs.org/docs/api/context-bridge
 */

/**
 * After analyzing the `exposeInMainWorld` calls,
 * `packages/preload/exposedInMainWorld.d.ts` file will be generated.
 * It contains all interfaces.
 * `packages/preload/exposedInMainWorld.d.ts` file is required for TS is `renderer`
 *
 * @see https://github.com/cawa-93/dts-for-context-bridge
 */

/**
 * Expose Environment versions.
 * @example
 * console.log( window.versions )
 */
contextBridge.exposeInMainWorld('versions', process.versions);

/**
 * Safe expose node.js API
 * @example
 * window.nodeCrypto('data')
 */
contextBridge.exposeInMainWorld('nodeCrypto', {
  sha256sum(data: BinaryLike) {
    const hash = createHash('sha256');
    hash.update(data);
    return hash.digest('hex');
  },
});

/** 
 * Share Context with renderer process
 */
contextBridge.exposeInMainWorld('electron_window', {
  tcmContext: tcmContext,
});

/**
 * Enable electron-logger in renderer
 * https://github.com/megahertz/electron-log/blob/master/docs/node-integration.md
 */
(window as any).eleclog = log.functions;