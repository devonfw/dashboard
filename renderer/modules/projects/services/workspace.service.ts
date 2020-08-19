import { IpcRendererEvent } from 'electron';

type ProjectsCallback = (directories: string[]) => void;

export class WorkspaceService {
  constructor(projectsCallback: ProjectsCallback) {
    global.ipcRenderer.on(
      'get:workspaceProjects',
      (_: IpcRendererEvent, dirs: string[]) => {
        projectsCallback(dirs);
      }
    );
  }

  getProjectsInWorkspace(workspacePath: string): void {
    global.ipcRenderer.send('find:workspaceProjects', workspacePath);
  }

  closeListener(): void {
    global.ipcRenderer.removeAllListeners('get:workspaceProjects');
  }
}
