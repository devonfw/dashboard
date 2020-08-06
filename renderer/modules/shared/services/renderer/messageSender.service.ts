import Renderer from './renderer.service';
import { ChannelObservable } from '../../utils/observation/observable';

interface DialogStatus {
  filePaths: string[];
  canceled?: boolean;
}
export default class MessageSenderService extends Renderer {
  constructor() {
    super();
  }

  async sendOpenDialog(): Promise<DialogStatus> {
    const message = await super.send<DialogStatus>('terminal/open-dialog');
    return message;
  }

  openIDE(ide: string): Promise<string> {
    return super.send<string>('terminal/all-commands', `devon ${ide}`);
  }

  installModules(path: string): ChannelObservable {
    return this.sendObservable('terminal/install-modules', path);
  }
}

export const messageSender = new MessageSenderService();
