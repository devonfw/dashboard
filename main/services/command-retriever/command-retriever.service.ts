import { exec } from 'child_process';
import Process from '../../decorators/process';
import { getOptions } from '../terminal/terminal-utils';
import { ReturnMessage } from '../shared/return-message';
import { promiseChildProcess } from '../shared/handle-child-process';
import { readdirPromise } from '../shared/promised';
import {
  IdeConfig,
  DevonfwConfig,
  IdeDistribution,
} from '../../models/devonfw-dists.model';
import * as fs from 'fs';

const MAX_BUFFER = 1024 * 500; /* 500 KB */

export class CommandRetrieverService {
  //@Process('command-retriever/all-commands')
  async getCommandsByIdeConfig(ideConfig: IdeConfig): Promise<void> {
    const commandsFolder = ideConfig.commands;

    try {
      const readDirs = await readdirPromise(commandsFolder);
      readDirs.forEach((dir: string) => {
        console.log(`command ${dir} found`);
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getWorkspacesByIdeConfig(ideConfig: IdeConfig): Promise<void> {
    const workspacesFolder = ideConfig.workspaces;

    try {
      const readDirs = await readdirPromise(workspacesFolder);
      readDirs.forEach((dir: string) => {
        console.log(`workspace ${dir} found`);
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getWorkspaceContent(workspace: string): Promise<void> {
    try {
      const readDirs = await readdirPromise(workspace);
      readDirs.forEach((dir: string) => {
        console.log(`workspace content ${dir} found`);
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getAllDistributions(devonfwConfig: DevonfwConfig): Promise<void> {
    const distributions: IdeDistribution[] = devonfwConfig.distributions;

    for (const dist of distributions) {
      try {
        await fs.promises.access(dist.id);
        console.log(`dist ${dist.id} exists`);
      } catch (error) {
        console.log(`dist ${dist.id} does not exist`);
      }
    }
  }

  addNewDistribution(
    devonfwConfig: DevonfwConfig,
    path: string,
    version: string
  ): void {
    // TODO: check if dist exists
    const ideDistribution: IdeDistribution = {
      id: path,
      ideConfig: {
        version: version,
        basepath: path,
        commands: path + '\\scripts\\command',
        workspaces: path + '\\workspaces',
      },
    };

    devonfwConfig.distributions[path] = ideDistribution;
  }

  private async allCommands(
    command: string,
    cwd?: string
  ): Promise<string | ReturnMessage> {
    if (!command) return '';

    const options = getOptions({ cwd, maxBuffer: MAX_BUFFER });
    const mvn = exec(command, options);

    try {
      const result = await promiseChildProcess(mvn);
      return new ReturnMessage(false, result);
    } catch (error) {
      return new ReturnMessage(true, error);
    }
  }
}
