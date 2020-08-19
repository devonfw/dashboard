import { IpcMainEvent, ipcMain } from 'electron';
import { DevonInstancesService } from '../../../../services/devon-instances/devon-instances.service';
import { ProjectListener } from '../../../../services/devon-instances/project-listener';
import { ProjectDetails } from '../../../../models/project-details.model';

export class DevonIdeProjectsListener implements ProjectListener {
  constructor(private devonInstance: DevonInstancesService) {}

  listen(): void {
    ipcMain.on('ide:projects', this.eventHandler.bind(this));
  }

  eventHandler(event: IpcMainEvent, path: string): void {
    this.devonInstance
      .readFile()
      .then((projects: ProjectDetails[]) => {
        event.sender.send('ide:projects', {
          projects: projects.filter((project) => project.path.includes(path)),
          message: 'success',
        });
      })
      .catch(() => {
        event.sender.send('ide:projects', {
          projects: [],
          message: 'error',
        });
      });
  }
}
