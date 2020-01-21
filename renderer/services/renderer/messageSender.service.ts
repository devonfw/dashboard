import Renderer from './renderer.service';

export default class MessageSenderService extends Renderer{

    constructor() {
        super();
    }

    async sendLs(cwd?: string) {
        const message = await super.send('terminal/ls', cwd)
        return message;
    }
    async sendMkdir(dirname: string) {
        const message = await super.send('terminal/mkdir', dirname)
        return message;
    }

    async sendPwd() {
        const message = await super.send('terminal/pwd');
        return message;
    }

    async sendRmdir(dirname: string) {
        const message = await super.send('terminal/rmdir', dirname)
        return message;
    }
    async sendOpenDialog() {
        const message = await super.send('terminal/open-dialog')
        return message;
    }
    async sendMvnHelp(currentWorkingDir: string) {
        const message = await super.send('terminal/mvn-install', currentWorkingDir)
        return message;
    }

    openIDE(ide: string) {
        return super.send('terminal/all-commands', `devon ${ide}`)
    }
}