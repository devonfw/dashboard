import { devonfwIDE } from './devonfwIDE';

export class devonfwDashboard {
  public devonfwIDEs: devonfwIDE[];

  constructor(devonfwIDEs: devonfwIDE[] = []) {
    this.devonfwIDEs = devonfwIDEs;
  }
}
