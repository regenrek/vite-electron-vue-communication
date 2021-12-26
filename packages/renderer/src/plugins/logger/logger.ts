import type { App } from 'vue';

export interface ILoggerOptions {
    enableFileLogger: boolean,
    filePath: string,
    isEnabled: boolean
}

function stringifyMessage(message: string) {
    if (typeof message === 'object') return JSON.stringify(message);
    return message;
}

function stringifyMessages(messages: string[]) {
    return messages.map(stringifyMessage).join(' ');
}

class Logger {
    enableFileLogger: boolean;
    filePath: string;
    isEnabled: boolean;

    constructor(options: ILoggerOptions) {
        this.enableFileLogger = options.enableFileLogger || true;
        this.filePath = options.filePath || '';
        this.isEnabled = options.isEnabled || true;
    }

    info(...messages: string[]) {
        this.logGatewayCall('info', stringifyMessages(messages));
    }

    warn(...messages: string[]) {
        this.logGatewayCall('warn', stringifyMessages(messages));
    }

    error(...messages: string[]) {
        this.logGatewayCall( 'error', stringifyMessages(messages));
    }

    logGatewayCall(level: string, message: string) {
        if (this.enableFileLogger && this.isEnabled) {
            // eslint-disable-next-line no-console
            console.log('in logger plugin ', level, message);
            // loggerApi.send(level, message);
        }
        
        // eslint-disable-next-line no-console
        if (this.isEnabled) console[level as string](message) as any;
    }
}

export default {
    install: (app: App, options: ILoggerOptions) => {
        const logger = new Logger(options);
        app.config.globalProperties.$log = logger;
    },    
};
