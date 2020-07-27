import { IpcRendererEvent } from 'electron';
import MainMessage from '../../models/main-message';
import { ProjectDetails } from '../../components/Stepper/redux/data.model';

type HandlerFunction = () => void;
type ChannelArgs = unknown;
class Renderer {
  private channels: string[] = [];

  on(channel: string, handler: HandlerFunction): void {
    global.ipcRenderer.on(channel, handler);
    this.channels.push(channel);
  }

  removeListener(channel: string, handler: HandlerFunction): void {
    global.ipcRenderer.removeListener(channel, handler);
    this.channels = this.channels.filter((sub) => sub != channel);
  }

  removeAll(): void {
    for (const channel of this.channels) {
      global.ipcRenderer.removeAllListeners(channel);
    }

    this.channels = [];
  }

  sendMultiple(channel: string, projectDetails?: ProjectDetails, ...args: ChannelArgs[]): void {
    global.ipcRenderer.send(channel, projectDetails ? projectDetails : '' , ...args);
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
}

export default Renderer;
