import {
  ProjectDetails,
  SearchForm,
} from '../../../modules/projects/redux/stepper/data.model';

export function applyFilter(
  searchFormState: SearchForm,
  allProjects: ProjectDetails[]
): ProjectDetails[] {
  const { searchValue, filterValue } = searchFormState;
  console.log('filter -> ', searchFormState);
  let result: ProjectDetails[] = [];
  let selectedFilteredValue = '';
  if (filterValue) {
    switch (filterValue) {
      case 'date':
        selectedFilteredValue = 'date';
        break;
      case 'name':
        selectedFilteredValue = 'name';
        break;
      default:
        selectedFilteredValue = 'domain';
        break;
    }
  }
  if (searchValue) {
    result = allProjects.filter((project: ProjectDetails | any) => {
      if (selectedFilteredValue === 'domain') {
        return (
          project.domain.indexOf(filterValue) !== -1 &&
          project.name.indexOf(searchValue) !== -1
        );
      }
      return project[selectedFilteredValue].includes(searchValue);
    });
  } else {
    result = allProjects;
  }
  return result;
}
