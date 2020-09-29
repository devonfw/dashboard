import { dataToCommandArgs, ProjectData } from './project';
import ProjectCommand from './project-command';

export default class AngularProjectCommand extends ProjectCommand {
  constructor(public data: ProjectData) {
    super(data);
  }

  setArgs(): void {
    const extraArgs = dataToCommandArgs(this.data.specificArgs).join(' ');
    this.args = `ng new ${this.data.name} ${extraArgs}`;
  }
}
