import { Command } from '../command';

export default class PomInstallCommand implements Command {
  constructor(private cwd: string) {}

  getCwd(): string {
    return this.cwd;
  }

  toString(): string {
    return `devon mvn clean install`;
  }
}
