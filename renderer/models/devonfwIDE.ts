export class Workspace {
  public directory: Directory;
  public availableCommands: Command[];
  public workspaces: Workspace[];

  constructor(directory!: Directory, availableCommands: Command[] = [], workspaces: Workspace[] = []) {
    this.directory = directory;
    this.availableCommands = availableCommands;
  }

  createWorkspace(name: string, location: string) {
    return false;
  }
}