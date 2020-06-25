// Native
import { join } from 'path';
import { format } from 'url';
import { IpcMainEvent } from 'electron';
import { spawn, StdioOptions, SpawnOptions } from 'child_process';
import * as fs from 'fs';

// Packages
import { BrowserWindow, app, ipcMain, shell } from 'electron';
import isDev from 'electron-is-dev';
import prepareNext from 'electron-next';

// Other dependencies
import { TerminalService } from './services/terminal/terminal.service';
import { CommandRetrieverService } from './services/command-retriever/command-retriever.service';
import { devonfwConfig } from './devonfw.config';

let mainWindow;
// Prepare the renderer once the app is ready
app.on('ready', async () => {
  await prepareNext('./renderer');

  mainWindow = new BrowserWindow({
    width: 1000,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      preload: join(__dirname, 'preload.js'),
    },
  });

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  const url = isDev
    ? 'http://localhost:8000/start'
    : format({
      pathname: join(__dirname, '../../renderer/start.html'),
      protocol: 'file:',
      slashes: true,
    });

  mainWindow.loadURL(url);

  mainWindow.webContents.session.on('will-download', downloadHandler)
});

// Quit the app once all windows are closed
app.on('window-all-closed', app.quit);

/* Manage all downloads */
const downloadHandler = (event, item, webContents) => {
  item.on('updated', (event, state) => {
    if (state === 'interrupted') {
      item.cancel();
    } else if (state === 'progressing') {
      if (!item.isPaused()) {
        mainWindow.webContents.send('download progress', { total: item.getTotalBytes(), received: item.getReceivedBytes() });
      }
    }
  })
  item.once('done', (event, state) => {
    mainWindow.webContents.send('download completed', state);
    if (state === 'completed') {
      shell.showItemInFolder(item.getSavePath());
    }
  })
};

// Finding out Devonfw Ide
const countInstance = () => {
  fs.readdir('/workspace', (error, files) => {
    const reg = /ide/;
    let ide = [];
    if (files) {
      ide = files.filter(file => reg.test(file) && isItContainZipFile(file));
    }
    let totalFiles = ide.length ? ide.length : 0; // return the number of files
    mainWindow.webContents.send('count:instances', { total: totalFiles });
  });

  function isItContainZipFile(file) {
    const lastWord = file.substring(file.lastIndexOf('.') + 1);
    if (lastWord) {
      if (lastWord !== 'tar' && lastWord !== 'gz') {
        return true;
      }
      return false;
    }
    return true;
  }
}

/* Enable services */

/* terminal powershell */
const eventHandler = (event: IpcMainEvent, ...eventArgs: any[]) => {
  const command = eventArgs[0];
  const cwd = eventArgs[1];
  console.log('received message:' + command);

  if (!command) event.sender.send('terminal/powershell', '');
  const stdioOptions: StdioOptions = ['pipe', 'pipe', 'pipe'];

  let options: SpawnOptions = { stdio: stdioOptions };
  options = cwd ? { ...options, cwd } : options;
  const terminal = spawn(`powershell.exe`, [], options);

  terminal.stdout.on('data', (data) => {
    console.log('sending data: ' + data.toString());
    event.sender.send('terminal/powershell', data.toString());
  });
  terminal.stderr.on('data', (data) => console.error(data.toString()));
  terminal.on('close', () => {
    console.log('closed stream');
  });

  terminal.stdin.write(command + '\n');
};

/* terminal service */
const terminalService = new TerminalService();
terminalService.ls();
terminalService.mkdir(null);
terminalService.rmdir(null);
terminalService.pwd();
terminalService.openDialog();
terminalService.mvnInstall();
terminalService.allCommands(null, null);
ipcMain.on('terminal/powershell', eventHandler);

/* command retriever service */
const commandRetrieverService = new CommandRetrieverService();
commandRetrieverService.getCommandsByIdeConfig(devonfwConfig.distributions[0].ideConfig);
commandRetrieverService.getWorkspacesByIdeConfig(devonfwConfig.distributions[0].ideConfig);
commandRetrieverService.getAllDistributions(devonfwConfig);
commandRetrieverService.addNewDistribution(devonfwConfig, "C:\\Proyectos\\devonfw-ide\\");

// Finding out Devonfw Ide
ipcMain.on('find:devonfw', countInstance);