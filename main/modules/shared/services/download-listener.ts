import { DownloadItem, BrowserWindow } from 'electron';
import { dirname } from 'path';

export default class DownloadListener {
  constructor(private item: DownloadItem, private mainWindow: BrowserWindow) {}

  listen(): void {
    this.onUpdate();
    this.onFinish();
  }

  private onUpdate(): void {
    this.item.on('updated', (_: unknown, state) => {
      if (state === 'interrupted') {
        this.item.cancel();
      }

      if (state === 'progressing') {
        if (!this.item.isPaused()) {
          this.notifyProgress();
        }
      }
    });
  }

  private onFinish(): void {
    this.item.once('done', (_, state) => {
      this.notifyFinish(state);
    });
  }

  private notifyProgress(): void {
    this.mainWindow.webContents.send('download progress', {
      total: this.item.getTotalBytes(),
      received: this.item.getReceivedBytes(),
    });
  }

  private notifyFinish(state: string): void {
    this.mainWindow.webContents.send('download completed', {
      state,
      filename: this.item.getFilename(),
      path: dirname(this.item.getSavePath()),
    });
  }
}
