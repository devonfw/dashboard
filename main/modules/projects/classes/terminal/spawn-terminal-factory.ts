import { SpawnOptions, StdioOptions, spawn } from 'child_process';
import { Terminal } from './terminal';
import { TerminalFactory } from './terminal-factory';
import { platform } from 'os';

export class SpawnTerminalFactory implements TerminalFactory {
  createTerminal(cwd: string): Terminal {
    const stdioOptions: StdioOptions = ['pipe', 'pipe', 'pipe'];
    const options: SpawnOptions = {
      stdio: stdioOptions,
      cwd,
    };

    return spawn(this.terminalByPlatform(), [], options);
  }

  private terminalByPlatform(): string {
    switch (platform()) {
      case 'win32': {
        return 'powershell.exe';
      }

      case 'linux': {
        return 'bash';
      }

      case 'darwin': {
        return 'bash';
      }
    }
  }
}
