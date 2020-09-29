import { Command } from '../command';
import { join } from 'path';

export interface InstallCommandData {
  idePath: string;
  projectName: string;
}

export default abstract class InstallCommand extends Command {
  constructor(protected data: InstallCommandData) {
    super();
  }

  abstract setArgs(): void;

  protected setLocation(): void {
    this.location = join(this.data.idePath, 'scripts', 'devon');
  }

  protected setCwd(): void {
    this.cwd = join(this.data.idePath, 'workspaces', this.data.projectName);
  }
}
