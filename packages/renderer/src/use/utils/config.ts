// import type { ComponentSize } from './types';

export interface InstallOptions {
    // size: ComponentSize
    zIndex: number
    locale?: any
}

let $OPTS = {} as InstallOptions;

const setConfig = (option: InstallOptions): void => {
    $OPTS = option;
};

const getConfig = (key: keyof InstallOptions): unknown => {
    return $OPTS[key];
};

export { getConfig, setConfig };