import { exec } from 'child_process';
import Process from '../../decorators/process';
import { getOptions } from '../terminal/terminal-utils';
import { ReturnMessage } from '../shared/return-message';
import { promiseChildProcess } from '../shared/handle-child-process';
import * as fs from 'fs';
import * as data from '../../../devonfw.config.json';

const MAX_BUFFER = 1024 * 500; /* 500 KB */

export class CommandRetrieverService {

  @Process('command-retriever/all-commands')
  async getCommands() {
    const commandsFolder = data.distributions[0].commands;
    
    fs.readdirSync(commandsFolder).forEach(file => {
      console.log(file);
    });
  }
  

  private async allCommands(command: string, cwd?: string) {
    if (!command) return '';

    const options = getOptions({ cwd, maxBuffer: MAX_BUFFER });
    let mvn = exec(command, options);

    try {
      const result = await promiseChildProcess(mvn);
      return new ReturnMessage(false, result);
    } catch (error) {
      return new ReturnMessage(true, error);
    }
  }
}
