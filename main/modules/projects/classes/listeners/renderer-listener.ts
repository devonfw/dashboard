import { Terminal } from '../terminal/terminal';
import { TerminalFactory } from '../terminal/terminal-factory';
import { Command } from '../commands/command';
import { IpcMainEvent, ipcMain } from 'electron';
import { ListenerErrorHandler } from './listener-error-handler';

type RendererEvent = IpcMainEvent;

export abstract class RendererListener<T> {
  protected terminal: Terminal | null;
  protected event: RendererEvent;
  protected errorHandler: ListenerErrorHandler;

  constructor(
    private channel: string,
    private terminalFactory: TerminalFactory
  ) {
    this.terminal = null;
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
    this.terminal = this.terminalFactory.createTerminal(command.getCwd());
    this.onData();
    this.onError();
    this.onClose();
    this.terminal.stdin.write(`${command.toString()} \n`);
    this.terminal.stdin.end();
  }

  protected onData(): void {
    this.terminal.stdout.on('data', (data) => {
      this.errorHandler.setSuccess();
      this.send('data', data);
    });
  }

  protected onError(): void {
    this.terminal.stderr.on('data', (data) => {
      this.errorHandler.setError();
      this.send('error', data);
    });
  }

  protected onClose(): void {
    this.terminal.on('close', () => {
      this.send('end', this.getErrorStatus());
    });
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
