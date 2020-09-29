import InstallCommand, { InstallCommandData } from './install-command';

export default class YarnInstallCommand extends InstallCommand {
  constructor(data: InstallCommandData) {
    super(data);
  }

  setArgs(): void {
    this.args = 'yarn install';
  }
}
