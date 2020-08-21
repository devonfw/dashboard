import { IpcMainEvent } from 'electron';
import { ProjectDetails } from '../../models/project-details.model';

export interface ProjectListener {
  listen: () => void;
  eventHandler: (event: IpcMainEvent, project: ProjectDetails | string) => void;
}
