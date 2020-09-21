import { ipcMain, IpcMainEvent, WebContents } from 'electron';
import UpdateIdeService from '../update-ide.service';

export interface UpdateIdeOptions {
  path: string;
}

export default class UpdateIdeListener {
  private sender: WebContents;
  private options: UpdateIdeOptions;
  private updateService: UpdateIdeService;

  constructor(private channel: string = 'update-ide') {}

  listen(): void {
    ipcMain.on(this.channel, this.updateHandler.bind(this));
    ipcMain.on(`${this.channel}:cancel`, this.cancelUpdateHandler.bind(this));
  }

  private updateHandler(event: IpcMainEvent, options: UpdateIdeOptions): void {
    this.sender = event.sender;
    this.options = options;
    this.update();
  }

  private cancelUpdateHandler(): void {
    this.updateService.cancelUpdate();
  }

  private update(): void {
    this.updateService = new UpdateIdeService(
      this.notifyProgress.bind(this),
      this.notifyFinish.bind(this),
      this.notifyError.bind(this),
      this.options
    );

    this.updateService.update();
  }

  private notifyProgress(progress: string): void {
    this.sender.send(this.channel, {
      finished: false,
      error: false,
      message: progress,
    });
  }

  private notifyFinish(exitCode: number): void {
    this.sender.send(this.channel, {
      finished: true,
      error: !!exitCode,
      message: '',
    });
  }

  private notifyError(message: string): void {
    this.sender.send(this.channel, {
      finished: false,
      error: true,
      message,
    });
  }
}
