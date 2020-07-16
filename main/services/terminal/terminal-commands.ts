export class Command {
  command: string;
  arguments: string[];

  constructor(command: string, args: string[] = []) {
    this.command = command;
    this.arguments = args;
  }

  toString() {
    return `${this.command} ${this.arguments.join(' ')}`;
  }
}

export const CMD_LS: Command = new Command('ls', ['-lh']);

export const CMD_DIR: Command = new Command('cmd', ['/r', 'dir', '/ad', '/b']);

export const CMD_MKDIR: Command = new Command('mkdir');

export const CMD_RMDIR: Command = new Command('rmdir');

export const CMD_PWD: Command = new Command('pwd');

export const POWERSHELL: Command = new Command('cmd.exe', ['mvn', '--help']);

export const CMD_CP: Command = new Command('cp');

export const CMD_XCOPY: Command = new Command('xcopy');
