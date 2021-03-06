import { Directory } from './Directory';
import { Project } from './Project';

export class Workspace {
  public directory: Directory;
  public projects: Project[];

  constructor(directory: Directory, projects: Project[]) {
    this.directory = directory;
    this.projects = projects;
  }
}
