import * as fs from 'fs';
import * as pathModule from 'path';
import { Command } from '../commands/command';
import { RendererListener } from './renderer-listener';
import { InstallCommandData } from '../commands/install-commands/install-command';
import YarnInstallCommand from '../commands/install-commands/yarn-install-command';
import NpmInstallCommand from '../commands/install-commands/npm-install-command';
import PomInstallCommand from '../commands/install-commands/pom-install-command';
import { join } from 'path';

export class InstallListener extends RendererListener<InstallCommandData> {
  constructor() {
    super('terminal/install-modules');
  }

  public buildCommand(data: InstallCommandData): Command {
    const path = join(data.idePath, 'workspaces', data.projectName);
    if (uses(path, 'package.json')) {
      if (uses(path, 'package-lock.json')) {
        return new NpmInstallCommand(data);
      } else {
        return new YarnInstallCommand(data);
      }
    } else if (uses(path, 'pom.xml')) {
      return new PomInstallCommand(data);
    }

    throw new Error('Package manager not found: ' + path);
  }
}

function uses(path: string, file: string): boolean {
  try {
    return fs.existsSync(pathModule.join(path, file));
  } catch (err) {
    return false;
  }
}
