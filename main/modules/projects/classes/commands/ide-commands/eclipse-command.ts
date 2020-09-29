import IdeCommand from './ide-command';

export class EclipseCommand extends IdeCommand {
  setArgs(): void {
    this.args = 'eclipse';
  }
}
