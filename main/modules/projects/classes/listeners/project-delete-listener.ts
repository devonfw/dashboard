import { IpcMainEvent, ipcMain } from 'electron';
import DevonInstancesService from '../../../../services/devon-instances/devon-instances.service';
import { ProjectDetails } from '../../../../models/project-details.model';
import { ProjectListener } from '../../../../services/devon-instances/project-listener';

export class ProjectDeleteListener implements ProjectListener {
  constructor(private devonInstance: DevonInstancesService) {}

  listen(): void {
    ipcMain.on('delete:project', this.eventHandler.bind(this));
  }

  eventHandler(
    event: IpcMainEvent,
    args: { project: ProjectDetails; dirPath: string } | any
  ): void {
    this.devonInstance
      .deleteProject(args.project, args.dirPath)
      .then((projects) => {
        event.sender.send('delete:project', {
          projects: projects,
          message: 'success',
        });
      })
      .catch(() => {
        event.sender.send('delete:project', {
          projects: [],
          message: 'error',
        });
      });
  }
}
