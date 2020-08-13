import { Command } from '../command';
import { dataToCommandArgs, ProjectData } from './project';

export default class AngularProjectCommand implements Command {
  constructor(public data: ProjectData) {}

  getCwd(): string {
    return this.data.path;
  }

  toString(): string {
    const commandArgs = dataToCommandArgs(this.data.specificArgs).join(' ');
    const generationCommand = `devon ng new ${this.data.name} ${commandArgs}`;

    return generationCommand;
  }
}
