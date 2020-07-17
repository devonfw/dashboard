import { spawn, exec, ChildProcessWithoutNullStreams } from 'child_process';
import Process from '../../decorators/process';
import { dialog } from 'electron';
import { dirStringToArray, lsOS, getOptions } from './terminal-utils';
import { Command, CMD_MKDIR, CMD_RMDIR, CMD_PWD } from './terminal-commands';
import { RendererMessage } from '../../models/renderer-message';

const MAX_BUFFER = 1024 * 500; /* 500 KB */

export class TerminalService {
  private standardHandler(
    spawn: ChildProcessWithoutNullStreams
  ): Promise<string> {
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
  async ls(cwd?: string): Promise<RendererMessage<string[]>> {
    const options = getOptions({ cwd });
    const cmd: Command = lsOS();
    const ls = exec(cmd.toString(), options);
    console.log(cmd);

    try {
      const result: string = (await this.standardHandler(ls)) as string;
      const resultArray = dirStringToArray(result);

      return new RendererMessage(false, resultArray);
    } catch (error) {
      return new RendererMessage(true, error);
    }
  }

  @Process('terminal/mkdir')
  async mkdir(dirname: string): Promise<RendererMessage<string>> {
    const mkdir = spawn(CMD_MKDIR.command, [dirname]);
    try {
      const result = await this.standardHandler(mkdir);
      return new RendererMessage(false, result);
    } catch (error) {
      return new RendererMessage(true, error);
    }
  }

  @Process('terminal/rmdir')
  async rmdir(dirname: string): Promise<RendererMessage<string>> {
    const rmdir = spawn(CMD_RMDIR.command, [dirname]);
    try {
      const result = await this.standardHandler(rmdir);
      return new RendererMessage(false, result);
    } catch (error) {
      return new RendererMessage(true, error);
    }
  }

  @Process('terminal/pwd')
  async pwd(): Promise<RendererMessage<string>> {
    const pwd = spawn(CMD_PWD.command, CMD_PWD.arguments);

    try {
      const result = await this.standardHandler(pwd);
      return new RendererMessage(false, result);
    } catch (error) {
      return new RendererMessage(true, error);
    }
  }

  @Process('terminal/open-dialog')
  async openDialog(): Promise<RendererMessage<Electron.OpenDialogReturnValue>> {
    try {
      const result = await dialog.showOpenDialog({
        properties: ['openDirectory'],
      });
      return new RendererMessage(false, result);
    } catch (error) {
      return new RendererMessage(true, error);
    }
  }

  @Process('terminal/mvn-install')
  async mvnInstall(cwd?: string): Promise<RendererMessage<string>> {
    const options = getOptions({ cwd, maxBuffer: MAX_BUFFER });
    const mvn = exec('mvn --help', options);

    try {
      const result = await this.standardHandler(mvn);
      return new RendererMessage(false, result);
    } catch (error) {
      return new RendererMessage(true, error);
    }
  }

  @Process('terminal/all-commands')
  async allCommands(
    command: string,
    cwd?: string
  ): Promise<RendererMessage<string>> {
    if (!command) return new RendererMessage(false, '');

    const options = getOptions({ cwd, maxBuffer: MAX_BUFFER });
    const mvn = exec(command, options);

    try {
      const result = await this.standardHandler(mvn);
      return new RendererMessage(false, result);
    } catch (error) {
      return new RendererMessage(true, error);
    }
  }
}
