import { ProjectDetails } from '../../../../redux/stepper/data.model';

export default class ProjectsPaginator {
  private page: number;

  constructor(public projects: ProjectDetails[], private itemsPerPage: number) {
    this.itemsPerPage = itemsPerPage;
    this.page = 0;
    this.projects = projects;
  }

  changePage(page: number): void {
    this.page = page;
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
    this.resetPage();
  }

  setProjects(projects: ProjectDetails[]): void {
    this.projects = projects;
    this.resetPage();
  }
}
