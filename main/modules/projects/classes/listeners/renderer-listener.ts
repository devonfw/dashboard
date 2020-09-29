import { Command } from '../commands/command';
import { IpcMainEvent, ipcMain } from 'electron';
import { ListenerErrorHandler } from './listener-error-handler';
import { CommandExecutor } from '../../../shared/classes/command-executor';

type RendererEvent = IpcMainEvent;

export abstract class RendererListener<T> {
  protected event: RendererEvent;
  protected errorHandler: ListenerErrorHandler;

  constructor(private channel: string) {
    this.errorHandler = new ListenerErrorHandler();
  }

  listen(): void {
    ipcMain.on(this.channel, this.eventHandler.bind(this));
  }

  private eventHandler(event: IpcMainEvent, arg: T) {
    this.event = event;
    const command: Command = this.buildCommand(arg);
    this.executeCommand(command);
  }

  abstract buildCommand(arg: T): Command;

  private executeCommand(command: Command): void {
    new CommandExecutor()
      .addCommand(command)
      .execute(
        this.onData.bind(this),
        this.onError.bind(this),
        this.onClose.bind(this)
      );
  }

  protected onData(data: string): void {
    this.errorHandler.setSuccess();
    this.send('data', data);
  }

  protected onError(data: string): void {
    this.errorHandler.setError();
    this.send('error', data);
  }

  protected onClose(): void {
    this.send('end', this.getErrorStatus());
  }

  protected send(status: string, data: unknown): void {
    const formattedData = data.toString();
    console.error(`${status} -> ${formattedData}`);
    this.event.sender.send(this.channel, {
      status,
      data: formattedData,
    });
  }

  protected getErrorStatus(): string {
    return this.errorHandler.getStatus();
  }
}
