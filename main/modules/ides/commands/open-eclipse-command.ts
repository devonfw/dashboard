import OpenIdeCommand from './open-ide-command';

export class OpenEclipseCommand extends OpenIdeCommand {
  setArgs(): void {
    this.args = 'eclipse';
  }
}
