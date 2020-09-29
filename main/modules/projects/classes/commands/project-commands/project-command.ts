import { Command } from '../command';
import { ProjectData } from './project';
import { join } from 'path';

export default abstract class ProjectCommand extends Command {
  constructor(protected data: ProjectData) {
    super();
  }

  abstract setArgs(): void;

  protected setLocation(): void {
    this.location = join(this.data.path, 'scripts', 'devon');
  }

  protected setCwd(): void {
    this.cwd = join(this.data.path, 'workspaces');
  }
}
