import * as fs from 'fs';
import { StdioOptions, SpawnOptions, spawn, ChildProcess } from 'child_process';
import { ManagerBehaviour } from './manager-behaviour';
import { NpmManagerBehaviour } from './npm-manager';
import { YarnManagerBehaviour } from './yarn-manager';
import { PomManagerBehaviour } from './pom-manager';

export class Installer {
  constructor(private packageManager: ManagerBehaviour) {}

  installerProcess(): ChildProcess {
    return this.packageManager.installerProcess();
  }

  installPackages(): void {
    this.packageManager.install();
  }
}

export function createInstaller(path: string): Installer {
  let manager: ManagerBehaviour;
  const stdioOptions: StdioOptions = ['pipe', 'pipe', 'pipe'];
  let options: SpawnOptions = { stdio: stdioOptions };
  options = path ? { ...options, cwd: path } : options;
  const terminal = spawn(`powershell.exe`, [], options);

  if (uses(path, 'package.json')) {
    if (uses(path, 'package-lock.json')) {
      manager = new NpmManagerBehaviour(terminal);
    } else {
      manager = new YarnManagerBehaviour(terminal);
    }
  } else if (uses(path, 'pom.xml')) {
    manager = new PomManagerBehaviour(terminal);
  } else {
    throw new Error('No package manager found');
  }

  return new Installer(manager);
}

function uses(path: string, file: string): boolean {
  try {
    return fs.existsSync(`${path}/${file}`);
  } catch (err) {
    return false;
  }
}
