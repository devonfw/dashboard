import { ipcMain, IpcMainEvent, WebContents } from 'electron';
import InstallIdeService from './install-ide.service';
import ExtractorService from './extractor.service';

interface InstallIdeOptions {
  filename: string;
  path: string;
  license: boolean;
  settingsUrl: string;
}

export default class InstallIdeListener {
  private sender: WebContents;
  private options: InstallIdeOptions;
  private ideInstaller: InstallIdeService;
  private extractor: ExtractorService;

  constructor(private channel: string = 'install-ide') {
    this.extractor = new ExtractorService();
  }

  listen(): void {
    ipcMain.on(this.channel, this.installHandler.bind(this));
  }

  private async installHandler(
    event: IpcMainEvent,
    options: InstallIdeOptions
  ): Promise<void> {
    this.sender = event.sender;
    this.options = options;

    const hasExtracted = await this.extract();

    if (hasExtracted) {
      this.install();
    }
  }

  private async extract(): Promise<boolean> {
    const path = this.options.path;
    const filename = this.options.filename;

    try {
      await this.extractor.extract(path, filename);
      const message = `${filename} files have been dumped in ${path}`;
      this.notifyProgress(message);
    } catch (_) {
      const message = `Extraction of ${filename} in ${path} has failed`;
      this.notifyError(message);
      return false;
    }

    return true;
  }

  private install(): void {
    this.ideInstaller = new InstallIdeService(
      this.notifyProgress,
      this.notifyFinish,
      this.options
    );

    this.ideInstaller.install();
  }

  private notifyProgress(progress: string): void {
    this.sender.send(this.channel, {
      finished: false,
      error: false,
      message: progress,
    });
  }

  private notifyFinish(): void {
    this.sender.send(this.channel, {
      finished: true,
      error: false,
      message: '',
    });
  }

  private notifyError(message: string): void {
    this.sender.send(this.channel, {
      finished: true,
      error: true,
      message,
    });
  }
}
