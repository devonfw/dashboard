import { Command } from '../command';

export default class YarnInstallCommand implements Command {
  constructor(private cwd: string) {}

  getCwd(): string {
    return this.cwd;
  }

  toString(): string {
    return `devon yarn install`;
  }
}
