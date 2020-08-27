import {
  ProjectDetails,
  SearchForm,
} from '../../../modules/projects/redux/stepper/data.model';

export class ProjectsFilter {
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
          return this.filterProjectsWithTechnologies(
            filterBasedOn,
            filterValue
          );
        } else {
          return this.filterProjectsWithTechnologies(
            filterBasedOn,
            filterValue
          ).filter((project) =>
            this.filterProjectsBasedOnName(project, searchValue)
          );
        }
      case 'date':
        if (!searchValue) {
          return this.filterProjectsWithDate();
        } else {
          return this.filterProjectsWithDate().filter((project) =>
            this.filterProjectsBasedOnName(project, searchValue)
          );
        }
      default:
        if (searchValue) {
          return this.filterProjectsWithSearchValue(searchValue, 'name');
        }
    }
    return this.allProjects;
  }

  // Filtering based on name field
  private filterProjectsBasedOnName(
    project: ProjectDetails,
    searchValue: string
  ): boolean {
    return project.name.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1;
  }

  // Filtering based on user entered search value
  private filterProjectsWithSearchValue(
    searchValue: string,
    field: string
  ): ProjectDetails[] {
    return this.allProjects.filter(
      (project: ProjectDetails | any) =>
        project[field].toLowerCase().indexOf(searchValue.toLowerCase()) !== -1
    );
  }

  // Filtering based on user selected technologies
  private filterProjectsWithTechnologies(
    field: string,
    domainValue: string
  ): ProjectDetails[] {
    return this.allProjects.filter(
      (project: ProjectDetails | any) =>
        project[field].indexOf(domainValue) !== -1
    );
  }

  // Sorting project based on Date if user selected 'By Date created option'
  private filterProjectsWithDate(): ProjectDetails[] {
    const cProjects = [...this.allProjects];
    return cProjects.sort((prev: ProjectDetails, next: ProjectDetails) => {
      const prevDate = this.dateFormatter(prev.date);
      const nextDate = this.dateFormatter(next.date);
      if (prevDate > nextDate) return -1;
      if (prevDate < nextDate) return 1;

      return 0;
    });
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

  // Date specific formatter
  private dateFormatter(date: string): Date {
    const newDate = date.split('/');
    return new Date(
      parseInt(newDate[1]) + 1 + '/' + newDate[0] + '/' + newDate[2]
    );
  }
}
