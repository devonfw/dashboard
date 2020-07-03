// Native
import { join } from 'path';
import { format } from 'url';
import { IpcMainEvent } from 'electron';
import { spawn, StdioOptions, SpawnOptions } from 'child_process';
import fs from 'fs';
import path from 'path';

// Packages
import { BrowserWindow, app, ipcMain, shell } from 'electron';
import isDev from 'electron-is-dev';
import prepareNext from 'electron-next';

// Other dependencies
import { TerminalService } from './services/terminal/terminal.service';
import { CommandRetrieverService } from './services/command-retriever/command-retriever.service';
import { devonfwConfig } from './devonfw.config';
import { DevonInstancesService } from './services/devon-instances/devon-instances.service';

let mainWindow;
// Prepare the renderer once the app is ready
app.on('ready', async () => {
  await prepareNext('./renderer');
  mainWindow = new BrowserWindow({
    width: 1500,
    height: 768,
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

// Finding out Devonfw Ide Instances
function countInstance() {
  new DevonInstancesService().getAvailableDevonIdeInstances().then(instances => {
    mainWindow.webContents.send('count:instances', { total: instances });
  }).catch(error => {
    console.log(error);
    mainWindow.webContents.send('count:instances', { total: 0 });
  });
}

// Get all User created Instances
function getDevonInstancesPath() {
  new DevonInstancesService().getAllUserCreatedDevonInstances().then((instancesPath: string[]) => {
    instancesPath.push(process.cwd());
    const getWorkspaces = findOutWorkspaceLocation(instancesPath);
    mainWindow.webContents.send('get:devoninstances', getWorkspaces.filter((item, pos) => getWorkspaces.indexOf(item) == pos));
  }).catch(error => {
    console.log(error);
    // If no instances are available
    mainWindow.webContents.send('get:devoninstances', findOutWorkspaceLocation([process.cwd()]));
  });
}

function findOutWorkspaceLocation(paths) {
  let workspaces = [];
  for (let path of paths) {
    if (path.includes('workspaces')) {
      workspaces.push(path.substring(path.lastIndexOf('workspaces') + 10, -path.length));
    } else {
      workspaces.push(path + '\\workspaces');
    }
  }
  return workspaces;
}

/* Enable services */

/* terminal powershell */
const eventHandler = (event: IpcMainEvent, ...eventArgs: any[]) => {
  const command = eventArgs[0];
  const cwd = eventArgs[1];

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
ipcMain.on('find:devonfwInstances', getDevonInstancesPath);