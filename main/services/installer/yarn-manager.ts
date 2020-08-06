import { ManagerBehaviour } from './manager-behaviour';
import { ChildProcess } from 'child_process';

export class YarnManagerBehaviour implements ManagerBehaviour {
  constructor(public terminal: ChildProcess) {}

  installerProcess(): ChildProcess {
    return this.terminal;
  }

  install(): void {
    this.terminal.stdin.write(`yarn 2>&1 | %{ "$_" }\n`);
    this.terminal.stdin.end();
  }
}
