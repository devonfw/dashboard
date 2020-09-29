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
}
