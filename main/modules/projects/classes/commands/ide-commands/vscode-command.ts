import IdeCommand from './ide-command';

export class VSCodeCommand extends IdeCommand {
  setArgs(): void {
    this.args = 'vscode';
  }
}
