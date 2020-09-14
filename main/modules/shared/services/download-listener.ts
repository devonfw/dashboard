import { DownloadItem, BrowserWindow } from 'electron';
import ExtractorService from './extractor.service';

export default class DownloadListener {
  private extractor: ExtractorService;
  constructor(private item: DownloadItem, private mainWindow: BrowserWindow) {
    this.extractor = new ExtractorService();
  }

  listen(): void {
    this.onUpdate();
    this.onFinish();
    this.extractFiles();
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
      this.extractFiles();
      this.notifyFinish(state);
      if (state === 'completed') {
      }
    });
  }

  private notifyProgress(): void {
    this.mainWindow.webContents.send('download progress', {
      total: this.item.getTotalBytes(),
      received: this.item.getReceivedBytes(),
    });
  }

  private notifyFinish(state: string): void {
    this.mainWindow.webContents.send('download completed', state);
  }

  private extractFiles(): Promise<string> {
    const filename = this.item.getFilename();
    const savePath = this.item.getSavePath();
    return this.extractor
      .extract(savePath, filename)
      .then(() => {
        const message = `${filename} files have been dumped in ${savePath}`;
        return message;
      })
      .catch(() => {
        const message = `Extraction of ${filename} in ${savePath} has failed`;
        return message;
      });
  }
}
