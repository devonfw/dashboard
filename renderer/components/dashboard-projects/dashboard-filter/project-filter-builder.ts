import {
  ProjectDetails,
  SearchForm,
} from '../../../modules/projects/redux/stepper/data.model';
import { ProjectDomainFilter } from './dashboard-projects-filters/project-domain-filter';
import { ProjectNameFilter } from './dashboard-projects-filters/project-name-filter';
import { ProjectDateFilter } from './dashboard-projects-filters/project-date-filter';

export class ProjectFilterBuilder {
  private allProjects: ProjectDetails[];
  constructor(projects: ProjectDetails[]) {
    this.allProjects = projects;
  }
  applyFilter(searchFormState: SearchForm): ProjectDetails[] {
    const { searchValue, filterValue } = searchFormState;
    const filterBasedOn = this.selectedFilterOption(filterValue);

    switch (filterBasedOn) {
      case 'domain':
        if (!searchValue) {
          return new ProjectDomainFilter(this.allProjects).filter(filterValue);
        } else {
          const filteredDomain = new ProjectDomainFilter(
            this.allProjects
          ).filter(filterValue);
          return new ProjectNameFilter(filteredDomain).filter(searchValue);
        }
      case 'date':
        if (!searchValue) {
          return new ProjectDateFilter(this.allProjects).sort();
        } else {
          const sortedProjects = new ProjectDateFilter(this.allProjects).sort();
          return new ProjectNameFilter(sortedProjects).filter(searchValue);
        }
      default:
        if (searchValue) {
          return new ProjectNameFilter(this.allProjects).filter(searchValue);
        }
    }
    return this.allProjects;
  }

  // Get to know the filter option by user selection
  private selectedFilterOption(filterValue: string): string {
    if (filterValue) {
      switch (filterValue) {
        case 'date':
          return 'date';
        case 'name':
          return 'name';
        default:
          return 'domain';
      }
    }
    return '';
  }
}
