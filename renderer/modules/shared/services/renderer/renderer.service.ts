import { IpcRendererEvent } from 'electron';
import MainMessage from '../../../../models/main-message';
import { ChannelObservable } from '../../utils/observation/observable';

type HandlerFunction<T> = (event: IpcRendererEvent, data: T) => void;
type ChannelArgs = unknown;
export interface Channel {
  status: string;
  data: string;
}

export type StopListener = () => void;

class Renderer {
  private channels: string[] = [];

  on<T>(channel: string, handler: HandlerFunction<T>): void {
    global.ipcRenderer.on(channel, handler);
    this.channels.push(channel);
  }

  removeAllInChannel(channel: string): void {
    global.ipcRenderer.removeAllListeners(channel);
    this.channels = this.channels.filter((existingChannel) => {
      return channel !== existingChannel;
    });
  }

  removeAll(): void {
    for (const channel of this.channels) {
      global.ipcRenderer.removeAllListeners(channel);
    }

    this.channels = [];
  }

  send<Response>(channel: string, ...args: ChannelArgs[]): Promise<Response> {
    const result = new Promise<Response>((resolve, reject) => {
      global.ipcRenderer.once(
        channel,
        (_: IpcRendererEvent, message: MainMessage<Response>) => {
          if (message.error) {
            reject(message.body);
          } else {
            resolve(message.body);
          }
        }
      );

      global.ipcRenderer.send(channel, ...args);
    });
    return result;
  }

  sendMultiple<Response>(
    channel: string,
    handler: (data?: Response) => void,
    ...args: ChannelArgs[]
  ): StopListener {
    const channelHandler = (_: unknown, data: Response) => handler(data);
    global.ipcRenderer.on(channel, channelHandler);
    global.ipcRenderer.send(channel, ...args);

    const stopListener = () => {
      global.ipcRenderer.removeAllListeners(channel);
    };

    return stopListener;
  }

  sendObservable<T>(channelName: string, channelData: T): ChannelObservable {
    const channelObservable = new ChannelObservable((data, error, end) => {
      this.on<Channel>(channelName, (_, channel) => {
        if (channel.status === 'data') {
          data(channel.data);
        }

        if (channel.status === 'error') {
          error(channel.data);
        }

        if (channel.status === 'end') {
          end(channel.data === 'error');
          global.ipcRenderer.removeAllListeners(channelName);
        }
      });
      global.ipcRenderer.send(channelName, channelData);
    });

    return channelObservable;
  }
}

export default Renderer;
