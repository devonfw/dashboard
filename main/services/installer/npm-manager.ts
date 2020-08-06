import { ManagerBehaviour } from './manager-behaviour';
import { ChildProcess } from 'child_process';

export class NpmManagerBehaviour implements ManagerBehaviour {
  constructor(public terminal: ChildProcess) {}

  installerProcess(): ChildProcess {
    return this.terminal;
  }

  install(): void {
    this.terminal.stdin.write(`npm install 2>&1 | %{ "$_" } \n`);
    this.terminal.stdin.end();
  }
}
