import { RendererListener } from '../../projects/classes/listeners/renderer-listener';
import { Command } from '../../projects/classes/commands/command';
import { OpenVSCodeCommand } from '../commands/open-vscode-command';
import { OpenEclipseCommand } from '../commands/open-eclipse-command';

export interface OpenIdeListenerData {
  ide: string;
  idePath: string;
}

export class OpenIdeListener extends RendererListener<OpenIdeListenerData> {
  constructor() {
    super('ides/open-ide');
  }

  public buildCommand(projectData: OpenIdeListenerData): Command {
    switch (projectData.ide) {
      case 'vscode': {
        return new OpenVSCodeCommand(projectData.idePath);
      }

      case 'eclipse': {
        return new OpenEclipseCommand(projectData.idePath);
      }

      default: {
        return new OpenVSCodeCommand(projectData.idePath);
      }
    }
  }
}
