import State from './state';
import ProjectsPaginator from './projects-paginator';

export default class QueryNoPage implements State {
  constructor(private projects: ProjectsPaginator) {}

  query(): void {
    this.projects.setState(this.projects.getQueryNoPageState()); // could be removed
  }

  changePage(page: number): void {
    this.projects.setPage(page);
    this.projects.setState(this.projects.getQueryPageState());
  }
}
