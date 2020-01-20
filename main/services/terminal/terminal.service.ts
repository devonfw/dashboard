import { spawn, exec, ChildProcessWithoutNullStreams } from 'child_process';
import Process from '../../decorators/process';
import { dialog } from 'electron';
import { dirStringToArray, lsOS, getOptions } from './terminal-utils';

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

export const CMD_DIR: Command = new Command('cmd', ['/r', 'dir', '/b', '/d']);

export const CMD_MKDIR: Command = new Command('mkdir');

export const CMD_RMDIR: Command = new Command('rmdir');

export const CMD_PWD: Command = new Command('pwd');

export const POWERSHELL: Command = new Command('cmd.exe', ['mvn', '--help']);

const MAX_BUFFER = 1024 * 500; /* 500 KB */

export class TerminalService {
  private standardHandler(spawn: ChildProcessWithoutNullStreams): Promise<{}> {
    return new Promise((resolve, reject) => {
      let result = '';
      let error = '';
      spawn.stdout.on('data', (data) => {
        result += data;
      });
      spawn.stderr.on('data', (data) => {
        error += data;
      });
      spawn.on('close', () => {
        if (error) {
          reject(result + error);
        } else {
          resolve(result + error);
        }
      });
      spawn.stdin.end();
    });
  }

  @Process('terminal/ls')
  async ls(cwd?: string) {
    const options = getOptions({ cwd });
    const cmd: Command = lsOS();
    const ls = exec(cmd.toString(), options);
    console.log(cmd)

    try {
      const result: string = (await this.standardHandler(ls)) as string;
      const resultArray = dirStringToArray(result);

      return new ReturnMessage(false, resultArray);
    } catch (error) {
      return new ReturnMessage(true, error);
    }
  }

  @Process('terminal/mkdir')
  async mkdir(dirname: string) {
    const mkdir = spawn(CMD_MKDIR.command, [dirname]);
    try {
      const result = await this.standardHandler(mkdir);

      return result;
    } catch (error) {
      return error;
    }
  }

  @Process('terminal/rmdir')
  async rmdir(dirname: string) {
    const rmdir = spawn(CMD_RMDIR.command, [dirname]);
    try {
      const result = await this.standardHandler(rmdir);
      return result;
    } catch (error) {
      return error;
    }
  }

  @Process('terminal/pwd')
  async pwd() {
    const pwd = spawn(CMD_PWD.command, CMD_PWD.arguments);

    try {
      const result = await this.standardHandler(pwd);
      return result;
    } catch (error) {
      return error;
    }
  }

  @Process('terminal/open-dialog')
  async openDialog() {
    try {
      const result = await dialog.showOpenDialog({
        properties: ['openDirectory'],
      });
      return new ReturnMessage(false, result);
    } catch (error) {
      return new ReturnMessage(true, error);
    }
  }

  @Process('terminal/mvn-install')
  async mvnInstall(cwd?: string) {
    const options = getOptions({ cwd, maxBuffer: MAX_BUFFER });
    let mvn = exec('mvn --help', options);

    try {
      const result = await this.standardHandler(mvn);
      return result;
    } catch (error) {
      return error;
    }
  }

  @Process('terminal/all-commands')
  async allCommands(command: string, cwd?: string) {
    if (!command) return '';

    const options = getOptions({ cwd, maxBuffer: MAX_BUFFER });
    let mvn = exec(command, options);

    try {
      const result = await this.standardHandler(mvn);
      return new ReturnMessage(false, result);
    } catch (error) {
      return new ReturnMessage(true, error);
    }
  }
}

class ReturnMessage {
  error: boolean;
  body: any;

  constructor(error: boolean, body: any) {
    this.error = error;
    this.body = body;
  }
}
