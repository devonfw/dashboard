import { Terminal } from '../terminal/terminal';
import { TerminalFactory } from '../terminal/terminal-factory';
import { Command } from '../commands/command';
import { IpcMainEvent, ipcMain } from 'electron';

type RendererEvent = IpcMainEvent;

export abstract class RendererListener<T> {
  terminal: Terminal | null;
  event: RendererEvent;
  errorMessage: string;

  constructor(
    private channel: string,
    private terminalFactory: TerminalFactory
  ) {
    this.terminal = null;
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
      this.unsetFinishedWitError();
      this.send('data', data);
    });
  }

  protected onError(): void {
    this.terminal.stderr.on('data', (data) => {
      this.setFinishedWithError();
      this.send('error', data);
    });
  }

  protected onClose(): void {
    this.terminal.on('close', () => {
      this.send('end', this.errorMessage);
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

  private setFinishedWithError() {
    this.errorMessage = 'error';
  }

  private unsetFinishedWitError() {
    this.errorMessage = '';
  }
}
