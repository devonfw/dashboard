import State from './state';
import NoQueryNoPage from './no-query-no-page';
import QueryNoPage from './query-no-page';
import QueryPage from './query-page';
import NoQueryPage from './no-query-page';
import { ProjectDetails } from '../../../../redux/stepper/data.model';

export default class ProjectsPaginator {
  private page: number;

  private noQueryNoPage: State;
  private noQueryPage: State;
  private queryNoPage: State;
  private queryPage: State;
  private state: State;

  constructor(public projects: ProjectDetails[], private itemsPerPage: number) {
    this.itemsPerPage = itemsPerPage;
    this.page = 0;
    this.projects = projects;

    this.noQueryNoPage = new NoQueryNoPage(this);
    this.noQueryPage = new NoQueryPage(this);
    this.queryNoPage = new QueryNoPage(this);
    this.queryPage = new QueryPage(this);
    this.state = new NoQueryNoPage(this);
  }

  paginate(): void {
    this.state.query();
  }

  changePage(page: number): void {
    this.state.changePage(page);
  }

  getItemsInPage(): ProjectDetails[] {
    return this.projects.slice(
      this.page * this.itemsPerPage,
      this.page * this.itemsPerPage + this.itemsPerPage
    );
  }

  resetPage(): void {
    this.page = 0;
  }

  setItemsPerPage(itemsPerPage: number): void {
    this.itemsPerPage = itemsPerPage;
    this.page = 0;
    this.state = this.queryNoPage;
  }

  setProjects(projects: ProjectDetails[]): void {
    this.projects = projects;
    this.page = 0;
    this.state = this.queryNoPage;
  }

  setPage(page: number): void {
    this.page = page;
  }

  setState(state: State): void {
    this.state = state;
  }

  getState(): State {
    return this.state;
  }

  getNoQueryNoPageState(): State {
    return this.noQueryNoPage;
  }
  getNoQueryPageState(): State {
    return this.noQueryPage;
  }
  getQueryNoPageState(): State {
    return this.queryNoPage;
  }
  getQueryPageState(): State {
    return this.queryPage;
  }
}
