import { Terminal } from './terminal';

export interface TerminalFactory {
  createTerminal(path: string): Terminal;
}
