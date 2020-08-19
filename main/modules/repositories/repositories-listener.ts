import { shell, IpcMainEvent, ipcMain } from 'electron';

export default class RepositoriesListener {
  private channel: string;

  constructor() {
    this.channel = 'repositories';
  }

  eventHandler(event: IpcMainEvent, url: string): void {
    shell.openExternal(url);
  }

  listen(): void {
    ipcMain.on(this.channel, this.eventHandler.bind(this));
  }
}
