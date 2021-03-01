import { Command } from '../commands/command';
import { RendererListener } from './renderer-listener';
import { ProjectData } from '../commands/project-commands/project';
import AngularProjectCommand from '../commands/project-commands/angular-project-command';
import JavaProjectCommand from '../commands/project-commands/java-project-command';
import NodeProjectCommand from '../commands/project-commands/node-project-command';
import { SaveDetails } from '../../../../services/devon-instances/save-details';
import { projectDate } from '../../../shared/utils/project-date';
import * as path from 'path';

export class ProjectCreationListener extends RendererListener<ProjectData> {
  data: ProjectData;

  constructor(private saveProject: SaveDetails) {
    super('terminal/create-project');
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
    super.onClose();
    this.saveProject.saveProjectDetails({
      date: projectDate(),
      name: this.data.name,
      domain: this.data.type,
      path: path.join(
        this.data.path,
        'workspaces',
        this.data.workspace,
        this.data.name
      ),
      workspace: this.data.workspace,
    });
  }
}
