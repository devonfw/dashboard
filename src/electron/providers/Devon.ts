import { ipcMain, BrowserWindow, shell, app } from "electron";
import { exec, spawn } from "child_process";
import * as fs from 'fs';
import * as http from 'http';
import * as targz from 'targz';
import ipcHandler from "./ipcHandler.schema";

export enum actions {
    CHECK_VERSION = 'devon.check-version',
    INSTALL_IDE = 'devon.install-ide',
    RUN_SCRIPT = 'devon.run-script',
    CREATE_PROJECT = 'devon.create-project',
    CREATE_WORKSPACE = 'devon.create-workspace',
    OPEN_WORKSPACE = 'devon.open-workspace'
}

export enum events {
    CONSOLE_OUTPUT = 'script-stdout',
    PROCESS_FINISHED = 'script-exit'
}

export default class Devon extends ipcHandler {

    public static actions = actions;
    public static events = events;

    public async init(win: BrowserWindow): Promise<void> {
        ipcMain.on(actions.CHECK_VERSION, async (event: any, ...args: any[]) => {
            exec('java -jar devcon.jar -v | tail -n 1', function (error, stdout, stderr) {
                if (error) throw error;
                event.returnValue = stdout.split('v.')[1];
            });
        });

        ipcMain.on(actions.INSTALL_IDE, async (event: any, ...args: any[]) => {
            const lastVersion = 'devon-ide-scripts-3.0.0-beta1.tar.gz';
            const ideUrl = 'http://repo.maven.apache.org/maven2/com/devonfw/tools/ide/devon-ide-scripts/3.0.0-beta1/devon-ide-scripts-3.0.0-beta1.tar.gz';
            if (!await fs.existsSync('./devon-projects/')) {
                await fs.mkdirSync('./devon-projects/');
            }
            var devonideComp = fs.createWriteStream(`./devon-projects/${lastVersion}`);
            win.webContents.send('script-out', 'Downloading!');
            await new Promise((resolve, reject) => {
                const request = http.get(ideUrl, function (response) {
                    response.pipe(devonideComp);
                    devonideComp.on('finish', () => {
                        devonideComp.close();
                        win.webContents.send('script-out', 'Dist Downloaded');
                        resolve();
                    });
                }).on('error', async function (err) {
                    await fs.unlinkSync(`./devon-projects/${lastVersion}`);
                    reject();
                })
            });
            win.webContents.send('script-out', 'Decompressing!');
            await new Promise((resolve, reject) => targz.decompress({
                src: `./devon-projects/${lastVersion}`,
                dest: '/projects'
            }, function (err) {
                if (err) {
                    win.webContents.send('script-out', 'Decompressed!');
                    reject(err);
                } else {
                    resolve();
                }
            }));
            win.webContents.send('script-finished', null);
        });

        ipcMain.on(actions.RUN_SCRIPT, (event: any, ...args: any[]) => {
            const script = spawn('java', ['-jar', 'devcon.jar', '-v']);
            script.stdout.on('data', (data) => {
                console.log(data.toString());
                win.webContents.send('script-out', data);
            });
            script.on('exit', () => {
                console.log('Process finished!');
                win.webContents.send('script-finished', null);
            });
        });

        ipcMain.on(actions.CREATE_PROJECT, (event: any, ...args: any[]) => {
            const script = spawn('java', ['-jar', './devondist/software/devcon/devcon.jar', 'oasp4j', 'create', '-servername', 'TestProject', '-packagename', 'io.devon.app.test', '-groupid', 'io.devon.app', '-version', '1.0-SNAPSHOT', '-dbtype', 'h2']);
            script.stdout.on('data', (data) => {
                console.log(data.toString());
                win.webContents.send('script-out', data);
            });
            script.on('exit', () => {
                console.log('Process finished!');
                win.webContents.send('script-finished', null);
            });
        });

        ipcMain.on(actions.CREATE_WORKSPACE, (event: any, name: string) => {
            const script = spawn('java', ['-jar', './devondist/software/devcon/devcon.jar', 'workspace', 'create', '-workspace', name, '-distribution', './devondist']);
            script.stdout.on('data', (data) => {
                console.log(data.toString());
                win.webContents.send(Devon.events.CONSOLE_OUTPUT, data);
            });
            script.on('exit', () => {
                console.log('Process finished!');
                win.webContents.send(Devon.events.PROCESS_FINISHED, null);
            });
        });

        ipcMain.on(actions.OPEN_WORKSPACE, (event: any, name: string) => {
            // shell.openItem(`devondist\\eclipse-${name}.bat`);
            shell.openItem(`${app.getAppPath()}\\devondist\\eclipse-${name}.bat`);
        });
    }
}