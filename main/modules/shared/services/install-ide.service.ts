import { exec, ChildProcess } from 'child_process';
import { join } from 'path';

const settingsUrlQuestion = 'hit return to install';
const licenseQuestion = 'Also it is included in';
const completedMessage = 'Press any key to continue';

interface InstallIdeOptions {
  path: string;
  license: boolean;
  settingsUrl: string;
}

export default class InstallIdeService {
  private installerProcess: ChildProcess;

  constructor(
    private onProgress: (message: string) => void,
    private onFinish: () => void,
    private options: InstallIdeOptions
  ) {}

  install(): void {
    this.installerProcess = exec(join(this.options.path, 'setup'));
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
    this.onProgress(progress);
  }

  private notifyFinish(): void {
    this.onFinish();
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
