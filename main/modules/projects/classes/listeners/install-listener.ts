import * as fs from 'fs';
import { Command } from '../commands/command';
import { RendererListener } from './renderer-listener';
import YarnInstallCommand from '../commands/install-commands/yarn-install-command';
import NpmInstallCommand from '../commands/install-commands/npm-install-command';
import PomInstallCommand from '../commands/install-commands/pom-install-command';
import { TerminalFactory } from '../terminal/terminal-factory';

export class InstallListener extends RendererListener<string> {
  constructor(terminalFactory: TerminalFactory) {
    super(terminalFactory, 'terminal/install-modules');
  }

  public buildCommand(path: string): Command {
    if (uses(path, 'package.json')) {
      if (uses(path, 'package-lock.json')) {
        return new NpmInstallCommand(path);
      } else {
        return new YarnInstallCommand(path);
      }
    } else if (uses(path, 'pom.xml')) {
      return new PomInstallCommand(path);
    }

    throw new Error('Package manager not found: ' + path);
  }
}

function uses(path: string, file: string): boolean {
  try {
    return fs.existsSync(`${path}/${file}`);
  } catch (err) {
    return false;
  }
}
