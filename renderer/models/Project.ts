export class Project {
  public defaultIDE: IDE;
  public openWith: IDE[];
  public directory: Directory;

  constructor(directory!: Directory defaultIDE: IDE = null, openWith: IDE[] = []) {
    this.directory = directory;
    this.defaultIDE = defaultIDE;
    this.openWith = openWith;
  }
}