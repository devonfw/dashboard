import Renderer from './renderer.service';

export class MessageSenderService {

    renderer: Renderer;
    constructor() {
        this.renderer = new Renderer()
    }
    async sendLs() {
        const message = await this.renderer.send('terminal/ls')
        return message;
    }
    async sendMkdir(dirname: string) {
        const message = await this.renderer.send('terminal/mkdir', dirname)
        return message;
    }

    async sendPwd() {
        const message = await this.renderer.send('terminal/pwd');
        return message;
    }

    async sendRmdir(dirname: string) {
        const message = await this.renderer.send('terminal/rmdir', dirname)
        return message;
    }
    async sendOpenDialog() {
        const message = await this.renderer.send('terminal/open-dialog')
        return message;
    }
    async sendMvnHelp(currentWorkingDir: string) {
        const message = await this.renderer.send('terminal/mvn-install', currentWorkingDir)
        return message;
    }
}