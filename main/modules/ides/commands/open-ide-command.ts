import { join } from 'path';
import { Command } from '../../projects/classes/commands/command';

export default abstract class OpenIdeCommand extends Command {
  constructor(protected idePath: string) {
    super();
  }

  protected abstract setArgs(): void;

  protected setLocation(): void {
    this.location = join(this.idePath, 'scripts', 'devon');
  }

  protected setCwd(): void {
    this.cwd = join(this.idePath, 'workspaces');
  }
}
