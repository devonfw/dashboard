import { Directory } from "./Directory";
import { Command } from "./Command";
import { Workspace } from "./Workspace";

export class devonfwIDE {
  public directory: Directory;
  public availableCommands: Command[];
  public workspaces: Workspace[];

  constructor(directory: Directory, availableCommands: Command[] = [], workspaces: Workspace[] = []) {
    this.directory = directory;
    this.availableCommands = availableCommands;
    this.workspaces = workspaces;
  }

  createWorkspace(name: string, location: string) {
    return false;
  }
}