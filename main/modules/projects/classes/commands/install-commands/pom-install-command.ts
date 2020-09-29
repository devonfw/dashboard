import InstallCommand, { InstallCommandData } from './install-command';

export default class PomInstallCommand extends InstallCommand {
  constructor(data: InstallCommandData) {
    super(data);
  }

  setArgs(): void {
    this.args = 'mvn clean install';
  }
}
