import { ProjectDetails } from '../../../../modules/projects/redux/stepper/data.model';
import { ProjectSort } from '../../../../models/project-filter/project-sort';

export class ProjectDateFilter implements ProjectSort {
  constructor(public projects: ProjectDetails[]) {}
  sort(): ProjectDetails[] {
    const cProjects = [...this.projects];
    return cProjects.sort((prev: ProjectDetails, next: ProjectDetails) => {
      const prevDate = this.dateFormatter(prev.date);
      const nextDate = this.dateFormatter(next.date);
      if (prevDate > nextDate) return -1;
      if (prevDate < nextDate) return 1;

      return 0;
    });
  }

  // Date specific formatter
  private dateFormatter(date: string): Date {
    const newDate = date.split('/');
    return new Date(
      parseInt(newDate[1]) + 1 + '/' + newDate[0] + '/' + newDate[2]
    );
  }
}
