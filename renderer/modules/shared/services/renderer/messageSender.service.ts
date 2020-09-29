import Renderer from './renderer.service';
import { ChannelObservable } from '../../utils/observation/observable';
import { ProjectData } from '../../../projects/redux/stepper/project-data.model';

interface DialogStatus {
  filePaths: string[];
  canceled?: boolean;
}

export interface InstallData {
  projectName: string;
  idePath: string;
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

  openIDE(ide: string, cwd?: string): Promise<string> {
    return super.send<string>('terminal/all-commands', `devon ${ide}`, cwd);
  }

  installModules(installData: InstallData): ChannelObservable {
    return this.sendObservable('terminal/install-modules', installData);
  }

  createProject(projectData: ProjectData): ChannelObservable {
    return this.sendObservable('terminal/create-project', projectData);
  }
}

export const messageSender = new MessageSenderService();
