import { Command } from '../commands/command';
import { RendererListener } from './renderer-listener';
import { ProjectData } from '../commands/project-commands/project';
import AngularProjectCommand from '../commands/project-commands/angular-project-command';
import JavaProjectCommand from '../commands/project-commands/java-project-command';
import NodeProjectCommand from '../commands/project-commands/node-project-command';
import { TerminalFactory } from '../terminal/terminal-factory';

export class ProjectCreationListener extends RendererListener<ProjectData> {
  constructor(terminalFactory: TerminalFactory) {
    super(terminalFactory, 'terminal/create-project');
  }

  public buildCommand(projectData: ProjectData): Command {
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
}
