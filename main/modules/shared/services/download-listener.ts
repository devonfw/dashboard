import { DownloadItem, shell, BrowserWindow } from 'electron';

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
          this.notifyPath();
        }
      }
    });
  }

  private onFinish(): void {
    this.item.once('done', (_, state) => {
      this.notifyFinish(state);
      if (state === 'completed') {
        shell.showItemInFolder(this.item.getSavePath());
      }
    });
  }

  private notifyProgress(): void {
    this.mainWindow.webContents.send('download progress', {
      total: this.item.getTotalBytes(),
      received: this.item.getReceivedBytes(),
    });
  }

  private notifyPath(): void {
    this.mainWindow.webContents.send('download path', {
      savePath: this.item.getSavePath(),
      filename: this.item.getFilename(),
    });
  }

  private notifyFinish(state: string): void {
    this.mainWindow.webContents.send('download completed', state);
  }
}
