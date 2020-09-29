import { exec, ChildProcess } from 'child_process';

export type OnData = (data: string) => void;
export type OnError = (data: string) => void;
export type OnFinish = (code?: number) => void;

export abstract class Command {
  protected args: string;
  protected location: string;
  protected cwd: string;
  protected built: string;
  protected executor: ChildProcess;

  public execute(): void {
    this.setArgs();
    this.setLocation();
    this.setCwd();
    this.build();
    this.executor = exec(this.built, { cwd: this.cwd });
  }

  public subscribe(onData: OnData, onError: OnError, onFinish: OnFinish): void {
    this.executor.stdout.on('data', onData);
    this.executor.stderr.on('data', onError);
    this.executor.on('close', onFinish);
  }

  protected abstract setArgs(): void;

  protected abstract setLocation(): void;

  protected abstract setCwd(): void;

  protected build(): void {
    this.built = `${this.location} ${this.args}`;
  }
}
