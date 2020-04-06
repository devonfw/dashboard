import { IDE, NullIDE } from './IDE';
import { Directory } from './Directory';

export class Project {
  public defaultIDE: IDE;
  public openWith: IDE[];
  public directory: Directory;

  constructor(
    directory: Directory,
    defaultIDE: IDE = new NullIDE(),
    openWith: IDE[] = [],
  ) {
    this.directory = directory;
    this.defaultIDE = defaultIDE;
    this.openWith = openWith;
  }
}
