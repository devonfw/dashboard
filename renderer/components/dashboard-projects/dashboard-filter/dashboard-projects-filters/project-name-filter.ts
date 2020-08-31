import { ProjectFilter } from '../../../../models/project-filter/project-filter';
import { ProjectDetails } from '../../../../modules/projects/redux/stepper/data.model';

export class ProjectNameFilter implements ProjectFilter {
  constructor(public projects: ProjectDetails[]) {}
  filter(compareTo: string): ProjectDetails[] {
    return this.projects.filter((project) =>
      project.name.toLowerCase().includes(compareTo.toLowerCase())
    );
  }
}
