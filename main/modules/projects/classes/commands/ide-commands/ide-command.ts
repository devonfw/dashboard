import { Command } from '../command';
import { join } from 'path';

export interface IdeCommandData {
  projectPath: string;
}

export default abstract class IdeCommand extends Command {
  constructor(protected projectPath: string) {
    super();
  }

  abstract setArgs(): void;

  protected setLocation(): void {
    this.location = join(
      this.projectPath,
      '..',
      '..',
      '..',
      'scripts',
      'devon'
    );
  }

  protected setCwd(): void {
    this.cwd = this.projectPath;
  }
}
