import {
  Command,
  OnData,
  OnError,
  OnFinish,
} from '../../projects/classes/commands/command';

const noOp = () => null;

export class CommandExecutor {
  command: Command;

  addCommand(command: Command): CommandExecutor {
    this.command = command;
    return this;
  }

  execute(
    notifyData: OnData = noOp,
    notifyError: OnError = noOp,
    notifyFinish: OnFinish = noOp
  ): void {
    this.command.execute();
    this.command.subscribe(notifyData, notifyError, notifyFinish);
  }

  executeAsPromise(): Promise<{
    stderr: string;
    stdout: string;
  }> {
    return new Promise((resolve, reject) => {
      let stdout = '';
      let stderr = '';

      try {
        this.command.execute();
        this.command.subscribe(
          (data: string) => (stdout += data),
          (error: string) => (stderr += error),
          () =>
            resolve({
              stderr,
              stdout,
            })
        );
      } catch (exception) {
        return reject(exception.message);
      }
    });
  }
}
