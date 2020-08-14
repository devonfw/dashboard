import { exec, ChildProcessWithoutNullStreams } from 'child_process';
import Process from '../../decorators/process';
import { dialog } from 'electron';
import { getOptions } from './terminal-utils';
import { RendererMessage } from '../../models/renderer-message';
import {
  OpenDialogProperties,
  OpenDialogFilters,
} from '../../models/open-dialog.model';

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

  @Process('terminal/open-dialog')
  async openDialog(
    type: OpenDialogProperties[],
    filters: OpenDialogFilters[]
  ): Promise<RendererMessage<Electron.OpenDialogReturnValue>> {
    try {
      const result = await dialog.showOpenDialog({
        properties: [...type],
        filters: [...filters],
      });
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
