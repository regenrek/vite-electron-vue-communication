import type { TcmContextApi } from './TcmContext';

// declare global {
//     interface Window {
//         electron_window: {
//             tcmContext: TcmContextApi
//         };
//     }
// }

const context: TcmContextApi = window.electron_window.tcmContext;

export default context;