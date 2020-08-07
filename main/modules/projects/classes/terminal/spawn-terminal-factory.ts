import { SpawnOptions, StdioOptions, spawn } from 'child_process';
import { Terminal } from './terminal';
import { TerminalFactory } from './terminal-factory';

export class SpawnTerminalFactory implements TerminalFactory {
  createTerminal(cwd: string): Terminal {
    const stdioOptions: StdioOptions = ['pipe', 'pipe', 'pipe'];
    const options: SpawnOptions = {
      stdio: stdioOptions,
      cwd,
    };

    return spawn(`powershell.exe`, [], options);
  }
}
