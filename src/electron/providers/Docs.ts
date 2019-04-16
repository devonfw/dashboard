import ipcHandler from "./ipcHandler.schema";
import { ipcMain, app, shell } from "electron";
import { exec, spawn } from "child_process";
import Devon from "./Devon";

export enum actions {
    GET_DOCS = 'docs.get-docs',
    GET_TEST_INFO = 'docs.get-test-info',
    OPEN_BROWSER = 'docs.open-browser'
}

export enum events {
    CUSTOM_OUTPUT = 'docs.custom-output'
}

export default class Docs extends ipcHandler {

    public static actions = actions;
    public static events = events;

    private getRemoteContent = async (url): Promise<string> => {
        return new Promise<string>((resolve, reject) => {
            const http = require('http'),
                https = require('https');

            let client = http;

            if (url.toString().indexOf("https") === 0) {
                client = https;
            }

            client.get(url, (resp) => {
                let data = '';

                // A chunk of data has been recieved.
                resp.on('data', (chunk) => {
                    data += chunk;
                });

                // The whole response has been received. Print out the result.
                resp.on('end', () => {
                    resolve(data);
                });

            }).on("error", (err) => {
                reject(err);
            });
        });
    };

    public async init(win: Electron.BrowserWindow) {
        ipcMain.on(actions.GET_DOCS, async(event: any, docs: string) => {
            const response = await this.getRemoteContent(docs);
            event.returnValue = response;
        });

        ipcMain.on(actions.GET_TEST_INFO, async(event: any, ...args: any[]) => {
            const script = spawn(`${app.getAppPath()}\\data\\testjson.bat`);
            script.stdout.on('data', (data) => {
                console.log(data.toString());
                win.webContents.send(events.CUSTOM_OUTPUT, data);
            });
            script.on('exit', () => {
                console.log('Process finished!');
                win.webContents.send(Devon.events.PROCESS_FINISHED, null);
            });
        });

        ipcMain.on(actions.OPEN_BROWSER, (event: any, url: string) => shell.openExternal(url));
    }

}