export default class Paginator<T> {
  private page: number;

  constructor(public items: T[], private itemsPerPage: number) {
    this.itemsPerPage = itemsPerPage;
    this.page = 0;
    this.items = items;
  }

  changePage(page: number): void {
    this.page = page;
  }

  getItemsInPage(): T[] {
    return this.items.slice(
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

  setItems(items: T[]): void {
    this.items = items;
    this.resetPage();
  }
}
