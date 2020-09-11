import tar from 'tar';
import { IpcMainEvent, ipcMain, WebContents } from 'electron';
import { join } from 'path';

interface ExtractOptions {
  file: string;
  path: string;
}

export default class ExtractorListener {
  private args: ExtractOptions;
  private sender: WebContents;

  constructor(private channel = 'extract-files') {}

  listen(): void {
    ipcMain.on(this.channel, this.extractHandler.bind(this));
  }

  private extractHandler(event: IpcMainEvent, args: ExtractOptions): void {
    this.args = args;
    this.sender = event.sender;

    this.extract();
  }

  private extract() {
    tar
      .extract({
        file: join(this.args.path, this.args.file),
        cwd: this.args.path,
      })
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
