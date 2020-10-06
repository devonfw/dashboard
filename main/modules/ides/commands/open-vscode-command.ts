import OpenIdeCommand from './open-ide-command';

export class OpenVSCodeCommand extends OpenIdeCommand {
  setArgs(): void {
    this.args = 'vscode';
  }
}
