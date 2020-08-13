import { Command } from '../commands/command';
import { RendererListener } from './renderer-listener';
import { ProjectData } from '../commands/project-commands/project';
import AngularProjectCommand from '../commands/project-commands/angular-project-command';
import JavaProjectCommand from '../commands/project-commands/java-project-command';
import NodeProjectCommand from '../commands/project-commands/node-project-command';
import { TerminalFactory } from '../terminal/terminal-factory';
import { SaveDetails } from '../../../../services/devon-instances/save-details';
import { projectDate } from '../../../shared/utils/project-date';
import * as path from 'path';

export class ProjectCreationListener extends RendererListener<ProjectData> {
  data: ProjectData;

  constructor(
    terminalFactory: TerminalFactory,
    private saveProject: SaveDetails
  ) {
    super('terminal/create-project', terminalFactory);
  }

  public buildCommand(projectData: ProjectData): Command {
    this.data = projectData;

    if (projectData.type == 'angular') {
      return new AngularProjectCommand(projectData);
    }

    if (projectData.type === 'java') {
      return new JavaProjectCommand(projectData);
    }

    if (projectData.type === 'node') {
      return new NodeProjectCommand(projectData);
    }

    throw new Error(`Unable to create ${projectData.type} project`);
  }

  protected onClose(): void {
    this.terminal.on('close', () => {
      this.send('end', this.errorMessage);
      this.saveProject.saveProjectDetails({
        date: projectDate(),
        name: this.data.name,
        domain: this.data.type,
        path: path.join(this.data.path, this.data.name),
      });
    });
  }
}
