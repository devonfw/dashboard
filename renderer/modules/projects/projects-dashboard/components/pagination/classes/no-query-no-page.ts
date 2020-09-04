import State from './state';
import ProjectsPaginator from './projects-paginator';

export default class NoQueryNoPage implements State {
  constructor(private projects: ProjectsPaginator) {}

  query(): void {
    this.projects.setState(this.projects.getQueryNoPageState());
  }
  changePage(page: number): void {
    this.projects.setPage(page);
    this.projects.setState(this.projects.getNoQueryPageState());
  }
}
