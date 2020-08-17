import Renderer from './renderer.service';
import { ChannelObservable } from '../../utils/observation/observable';

interface DialogStatus {
  filePaths: string[];
  canceled?: boolean;
}

interface SpecificArgs {
  [key: string]: string | boolean | null | undefined;
}

export interface ProjectData {
  name: string;
  type: string;
  path: string;
  specificArgs: SpecificArgs;
}

export default class MessageSenderService extends Renderer {
  constructor() {
    super();
  }

  async sendOpenDialog(
    dialogType: string[],
    dialogFilters: { name: string; extensions: string[] }[]
  ): Promise<DialogStatus> {
    const message = await super.send<DialogStatus>(
      'terminal/open-dialog',
      dialogType,
      dialogFilters
    );
    return message;
  }

  openIDE(ide: string): Promise<string> {
    return super.send<string>('terminal/all-commands', `devon ${ide}`);
  }

  installModules(path: string): ChannelObservable {
    return this.sendObservable('terminal/install-modules', path);
  }

  createProject(projectData: ProjectData): ChannelObservable {
    return this.sendObservable('terminal/create-project', projectData);
  }
}

export const messageSender = new MessageSenderService();
