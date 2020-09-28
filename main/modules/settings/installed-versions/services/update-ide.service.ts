import { exec, ChildProcess, spawn } from 'child_process';
import path from 'path';
import { platform } from 'os';
import { UpdateIdeOptions } from './listeners/update-ide.listener';

export default class UpdateIdeService {
  private updateProcess: ChildProcess;
  private killed: boolean;

  constructor(
    private onProgress: (message: string) => void,
    private onFinish: (exitCode: number) => void,
    private onError: (message: string) => void,
    private options: UpdateIdeOptions
  ) {}

  update(): void {
    this.updateProcess = exec('./devon ide update', {
      cwd: path.resolve(this.options.path, 'scripts'),
    });
    this.updateProcess.stdout.on('data', (data) => {
      if (!this.killed) {
        const processedData = data.toString().trim();
        this.notifyProgress(processedData);
      }
    });
    this.updateProcess.stderr.on('data', (data) => {
      const processedData = data.toString().trim();
      this.notifyError(processedData);
    });
    this.updateProcess.on('exit', (code) => {
      this.notifyFinish(code);
    });
  }

  public cancelUpdate(): void {
    if (platform() === 'win32') {
      spawn('taskkill', ['/pid', `${this.updateProcess.pid}`, '/f', '/t']);
      this.killed = true;
    } else {
      this.killed = this.updateProcess.kill('SIGTERM');
    }
  }

  private notifyProgress(progress: string): void {
    this.onProgress(progress);
  }

  private notifyFinish(exitCode: number): void {
    this.onFinish(exitCode);
  }

  private notifyError(error: string): void {
    this.onError(error);
  }
}
