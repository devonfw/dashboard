import InstallCommand, { InstallCommandData } from './install-command';

export default class NpmInstallCommand extends InstallCommand {
  constructor(data: InstallCommandData) {
    super(data);
  }

  setArgs(): void {
    this.args = 'npm install';
  }
}
