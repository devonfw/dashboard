import { Command } from '../command';

export default class NpmInstallCommand implements Command {
  constructor(private cwd: string) {}

  getCwd(): string {
    return this.cwd;
  }

  toString(): string {
    return `npm install`;
  }
}
