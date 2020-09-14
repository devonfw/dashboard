import { IpcMainEvent, ipcMain, WebContents } from 'electron';
import ExtractorService from './extractor.service';

interface ExtractOptions {
  file: string;
  path: string;
}

export default class ExtractorListener {
  private args: ExtractOptions;
  private sender: WebContents;
  private extractor: ExtractorService;

  constructor(private channel = 'extract-files') {
    this.extractor = new ExtractorService();
  }

  listen(): void {
    ipcMain.on(this.channel, this.extractHandler.bind(this));
  }

  private extractHandler(event: IpcMainEvent, args: ExtractOptions): void {
    this.args = args;
    this.sender = event.sender;

    this.extract();
  }

  private extract() {
    this.extractor
      .extract(this.args.path, this.args.file)
      .then(() => {
        const message = `${this.args.file} files have been dumped in ${this.args.path}`;
        this.notifyProgress(message);
      })
      .catch(() => {
        const message = `Extraction of ${this.args.file} in ${this.args.path} has failed`;
        this.notifyProgress(message);
      });
  }

  private notifyProgress(progress: string): void {
    this.sender.send(this.channel, { finished: true, message: progress });
  }
}
