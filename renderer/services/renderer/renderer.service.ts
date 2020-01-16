import { IpcRendererEvent } from 'electron';

class Renderer {

    private channels: string[] = [];

    on(channel: string, handler: Function) {
        global.ipcRenderer.on(channel, handler);
        this.channels.push(channel);
    }

    removeListener(channel: string, handler: Function) {
        global.ipcRenderer.removeListener(channel, handler);
        this.channels = this.channels.filter(sub => sub != channel);
    }

    removeAll() {
        for (const channel of this.channels) {
            global.ipcRenderer.removeAllListeners(channel);
        }

        this.channels = [];
    }

    sendMultiple(channel: string, ...args: any[]) {
        global.ipcRenderer.send(channel, ...args)
    }

    send(channel: string, ...args: any[]): Promise<any> {
        const result = new Promise<{ error?: string }>((resolve, reject) => {
            global.ipcRenderer.once(
                channel,
                (_: IpcRendererEvent, message: ReturnMessage) => {
                    if (message.error) {
                        reject(message.body);
                    } else {
                        resolve(message.body);
                    }
                });

            global.ipcRenderer.send(channel, ...args);
        });
        return result;
    }
}

export default Renderer;

export class ReturnMessage {
    error: boolean;
    body: {};

    constructor(error: boolean, body: {}) {
        this.error = error;
        this.body = body;
    }
}