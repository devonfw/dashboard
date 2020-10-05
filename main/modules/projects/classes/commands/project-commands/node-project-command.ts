import { dataToCommandArgs, ProjectData } from './project';
import ProjectCommand from './project-command';

export default class NodeProjectCommand extends ProjectCommand {
  constructor(public data: ProjectData) {
    super(data);
  }

  setArgs(): void {
    const extraArgs = dataToCommandArgs(this.data.specificArgs).join(' ');
    this.args = `node create ${this.data.name} ${extraArgs}`;
  }
}
