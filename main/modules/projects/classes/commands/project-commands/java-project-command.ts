import { dataToCommandArgs, ProjectData } from './project';
import { Command } from '../command';

export default class JavaProjectCommand implements Command {
  constructor(public data: ProjectData) {}

  getCwd(): string {
    return this.data.path;
  }

  toString(): string {
    const commandArgs = dataToCommandArgs(this.data.specificArgs).join(' ');
    const generationCommand = `devon java create ${commandArgs}`;

    return generationCommand;
  }
}
