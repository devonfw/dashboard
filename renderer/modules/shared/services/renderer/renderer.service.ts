import { IpcRendererEvent } from 'electron';
import MainMessage from '../../../../models/main-message';
import { ProjectDetails } from '../../../projects/redux/stepper/data.model';
import { ChannelObservable } from '../../utils/observation/observable';

type HandlerFunction<T> = (event: IpcRendererEvent, data: T) => void;
type ChannelArgs = unknown;
export interface Channel {
  status: string;
  data: string;
}

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

  sendMultiple(
    channel: string,
    projectDetails?: ProjectDetails,
    ...args: ChannelArgs[]
  ): void {
    global.ipcRenderer.send(
      channel,
      projectDetails ? projectDetails : '',
      ...args
    );
  }

  send<Body>(channel: string, ...args: ChannelArgs[]): Promise<Body> {
    const result = new Promise<Body>((resolve, reject) => {
      global.ipcRenderer.once(
        channel,
        (_: IpcRendererEvent, message: MainMessage<Body>) => {
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
          this.removeAllInChannel(channelName);
        }
      });
      global.ipcRenderer.send(channelName, channelData);
    });

    return channelObservable;
  }
}

export default Renderer;
