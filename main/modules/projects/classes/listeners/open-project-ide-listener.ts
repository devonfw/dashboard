import { IpcMainEvent, ipcMain } from 'electron';
import { DevonInstancesService } from '../../../../services/devon-instances/devon-instances.service';
import {
  ProjectDetails,
  ProcessState,
  ProcessHandlerMessage,
} from '../../../../models/project-details.model';
import { ProjectListener } from '../../../../services/devon-instances/project-listener';

export class OpenProjectIDEListener implements ProjectListener {
  constructor(private devonInstance: DevonInstancesService) {}

  listen(): void {
    ipcMain.on('open:projectInIde', this.eventHandler.bind(this));
  }

  eventHandler(
    event: IpcMainEvent,
    args: { project: ProjectDetails; ide: string } | any
  ): void {
    console.log(args);
    if (args.ide === 'vscode') {
      this.devonInstance
        .openIdeExecutionCommandForVscode(args.project, args.ide)
        .then((data: ProcessState) => {
          this.eventHandlerMessage(event, {
            data: data,
            message: 'success',
          });
        })
        .catch((error: ProcessState) => {
          this.eventHandlerMessage(event, {
            data: error,
            message: this.errorMessage(error),
          });
        });
    } else {
      this.devonInstance
        .openIdeExecutionCommand(args.project, args.ide)
        .then((data: ProcessState) => {
          this.eventHandlerMessage(event, {
            data: data,
            message: 'success',
          });
        })
        .catch((error: ProcessState) => {
          this.eventHandlerMessage(event, {
            data: error,
            message: this.errorMessage(error),
          });
        });
    }
  }

  private errorMessage(error: ProcessState): string {
    return error.stderr.includes('Your workspace is locked')
      ? 'Eclipse ide already opened'
      : 'Failed to open IDE due to technical issue';
  }

  private eventHandlerMessage(
    event: IpcMainEvent,
    data: ProcessHandlerMessage
  ): void {
    event.sender.send('open:projectInIde', {
      data: data.data,
      message: data.message,
    });
  }
}
