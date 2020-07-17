import Renderer from './renderer.service';

interface DialogStatus {
  filePaths: string[];
  canceled?: boolean;
}
export default class MessageSenderService extends Renderer {
  constructor() {
    super();
  }

  async sendLs(cwd?: string): Promise<string[]> {
    const message = await super.send<string[]>('terminal/ls', cwd);
    return message;
  }
  async sendMkdir(dirname: string): Promise<string> {
    const message = await super.send<string>('terminal/mkdir', dirname);
    return message;
  }

  async sendPwd(): Promise<string> {
    const message = await super.send<string>('terminal/pwd');
    return message;
  }

  async sendRmdir(dirname: string): Promise<string> {
    const message = await super.send<string>('terminal/rmdir', dirname);
    return message;
  }
  async sendOpenDialog(): Promise<DialogStatus> {
    const message = await super.send<DialogStatus>('terminal/open-dialog');
    return message;
  }
  async sendMvnHelp(currentWorkingDir: string): Promise<string> {
    const message = await super.send<string>(
      'terminal/mvn-install',
      currentWorkingDir
    );
    return message;
  }

  openIDE(ide: string): Promise<string> {
    return super.send<string>('terminal/all-commands', `devon ${ide}`);
  }

  async sendCopy(
    source: string,
    which: string[],
    dest: string
  ): Promise<string | undefined> {
    const filesToBeCopied = which.map((file) => {
      return {
        source: `${source}\\${file}`,
        dest: `${dest}\\${file}`,
      };
    });

    for (const file of filesToBeCopied) {
      super.send<string>(
        'terminal/all-commands',
        `xcopy ${file.source} ${file.dest} /E /I /Y`
      );
    }
    return;
  }
}
