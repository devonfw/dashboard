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
  workspace: string;
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

  openIDE(ide: string, idePath?: string): Promise<void> {
    return new Promise((resolve, reject) => {
      super.sendMultiple(
        'ides/open-ide',
        (res: { status: string; data: string }) => {
          if (res.status === 'end') {
            if (res.data === 'error') {
              reject();
            } else {
              resolve();
            }
          }
        },
        { ide, idePath }
      );
    });
  }

  installModules(installData: InstallData): ChannelObservable {
    return this.sendObservable('terminal/install-modules', installData);
  }

  createProject(projectData: ProjectData): ChannelObservable {
    return this.sendObservable('terminal/create-project', projectData);
  }
}

export const messageSender = new MessageSenderService();
