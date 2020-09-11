import { exec, ChildProcess } from 'child_process';
import { ipcMain, IpcMainEvent, WebContents } from 'electron';
import { join } from 'path';

const settingsUrlQuestion = 'hit return to install';
const licenseQuestion = 'Also it is included in';
const completedMessage = 'Press any key to continue';

interface InstallIdeOptions {
  license: boolean;
  settingsUrl: string;
}

export default class InstallIdeListener {
  private options: InstallIdeOptions;
  private sender: WebContents;
  private path: string;
  private installerProcess: ChildProcess;

  constructor(private channel: string = 'install-ide') {}

  listen(): void {
    ipcMain.on(this.channel, this.installHandler.bind(this));
  }

  private installHandler(
    event: IpcMainEvent,
    path: string,
    options: InstallIdeOptions
  ): void {
    this.options = options;
    this.sender = event.sender;
    this.path = path;

    this.startInstallation();
  }

  private startInstallation() {
    this.installerProcess = exec(join(this.path, 'setup'));
    this.installerProcess.stdin.setDefaultEncoding('utf8');
    this.installerProcess.stdout.on('data', function (data) {
      const processedData = data.toString().trim();
      this.notifyProgress(processedData);

      if (processedData.includes(settingsUrlQuestion)) {
        this.setSettingsUrl();
      }

      if (processedData.includes(licenseQuestion)) {
        this.setLicenseAgreement();
      }

      if (processedData.includes(completedMessage)) {
        this.finish();
        this.notifyFinish();
      }
    });
  }

  private notifyProgress(progress: string): void {
    this.sender.send(this.channel, { finished: false, message: progress });
  }

  private notifyFinish(): void {
    this.sender.send(this.channel, { finished: true, message: '' });
  }

  private setSettingsUrl(): void {
    const settingsUrl = this.options.settingsUrl
      ? this.options.settingsUrl
      : '';
    this.installerProcess.stdin.write(`${settingsUrl}\n`);
  }

  private setLicenseAgreement(): void {
    const licenseAgreement = this.options.license ? 'yes' : 'no';
    this.installerProcess.stdin.write(`${licenseAgreement}\n`);
  }

  private finish(): void {
    this.installerProcess.stdin.write('\n');
  }
}
