import { ipcMain, WebContents, IpcMainEvent } from 'electron';
import { licensePath } from '../config/paths';
import fs from 'fs';

const CHANNEL = 'check-license';

export default class LicenseListener {
  private sender: WebContents;

  listen(): void {
    ipcMain.on(CHANNEL, this.installHandler.bind(this));
  }

  private async installHandler(event: IpcMainEvent): Promise<void> {
    this.sender = event.sender;
    this.notifyAcceptState();
  }

  private notifyAcceptState(): void {
    this.sender.send(CHANNEL, { error: false, body: this.isLicenseAccepted() });
  }

  private isLicenseAccepted(): boolean {
    try {
      return fs.existsSync(licensePath);
    } catch (err) {
      return false;
    }
  }
}
