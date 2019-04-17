import { ipcMain, BrowserWindow, shell, app } from "electron";
import { exec, spawn } from "child_process";
import * as fs from 'fs';
import * as http from 'http';
import * as targz from 'targz';
import ipcHandler from "./ipcHandler.schema";

export enum actions {
    CHECK_VERSION = 'devon.check-version',
    INSTALL_IDE = 'devon.install-ide',
}

export enum events {
    CONSOLE_OUTPUT = 'script-stdout',
    PROCESS_FINISHED = 'script-exit'
}

export default class Devon extends ipcHandler {

    public static actions = actions;
    public static events = events;

    public async init(win: BrowserWindow): Promise<void> {
        ipcMain.on(actions.INSTALL_IDE, async (event: any, ...args: any[]) => {
            const version = '3.0.0-beta5';
            const ideUrl = `http://repo.maven.apache.org/maven2/com/devonfw/tools/ide/devon-ide-scripts/${version}/devon-ide-scripts-${version}.tar.gz`;
            if (!fs.existsSync('./data/devon-projects')) {
                fs.mkdirSync('./data/devon-projects');
            }
            var devonideComp = fs.createWriteStream(`./data/devon-projects/${version}.tar.gz`);
            win.webContents.send(events.CONSOLE_OUTPUT, `Downloading version ${version} of Devon-ide`);
            await new Promise((resolve, reject) => {
                const request = http.get(ideUrl, function (response) {
                    response.pipe(devonideComp);
                    devonideComp.on('finish', () => {
                        devonideComp.close();
                        win.webContents.send(events.CONSOLE_OUTPUT, 'Download finished!');
                        resolve();
                    });
                }).on('error', async function (err) {
                    await fs.unlinkSync(`./data/devon-projects/${version}.tar.gz`);
                    reject();
                })
            });
            win.webContents.send(events.CONSOLE_OUTPUT, `Installing Devon-ide ${version} distribution.`);
            targz.decompress({
                src: `./data/devon-projects/${version}.tar.gz`,
                dest: `./data/devon-projects/`
            }, function (err) {
                win.webContents.send(events.CONSOLE_OUTPUT, 'Finished copying files!');
                // shell.openItem(`${app.getAppPath()}\\data\\devon-projects\\setup.bat`);
                const script = spawn(`${app.getAppPath()}\\data\\devon-projects\\setup.bat`, ['https://myhost.name/myrepo.git']);
                script.stdout.on('data', (data) => {
                    console.log(data.toString());
                    win.webContents.send(Devon.events.CONSOLE_OUTPUT, data);
                });
                script.on('exit', () => {
                    console.log('Process finished!');
                    win.webContents.send(Devon.events.PROCESS_FINISHED, null);
                });
                win.webContents.send(events.PROCESS_FINISHED, null);
            });
        });
    }
}