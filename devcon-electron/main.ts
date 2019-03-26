import { app, BrowserWindow, screen, Menu, ipcMain } from 'electron';
import * as path from 'path';
import * as url from 'url';
import { AppConfig } from './src/environments/environment';
import { mainMenu } from './menu';
import * as Path from './src/common/utils/Path';
import * as fs from 'fs';
import { ContextPathInfo } from './src/common/utils/ContextPathInfo';
import { Workspace } from './src/modules/workspace/Workspace';

let win, serve;
const args = process.argv.slice(1);
serve = args.some((val) => val === '--serve');

function createWindow() {
  const electronScreen = screen;
  const size = electronScreen.getPrimaryDisplay().workAreaSize;

  if (AppConfig.production === false) {
    mainMenu.push({
      label: 'View',
      submenu: [
        { label: 'Reload', role: 'reload' },
        { label: 'Force Reload', role: 'forcereload' },
        {
          label: 'Toggle Developpers Tools',
          role: 'toggledevtools',
        },
      ],
    });
  }

  // Create the browser window.
  win = new BrowserWindow({
    x: 0,
    y: 0,
    width: size.width,
    height: size.height,
  });

  if (serve) {
    require('electron-reload')(__dirname, {
      electron: require(`${__dirname}/node_modules/electron`),
    });
    win.loadURL('http://localhost:4200');
  } else {
    win.loadURL(
      url.format({
        pathname: path.join(__dirname, 'dist/index.html'),
        protocol: 'file:',
        slashes: true,
      }),
    );
  }

  win.webContents.openDevTools();

  prueba(app.getAppPath());

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store window
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });

  const menu = Menu.buildFromTemplate(mainMenu);
  Menu.setApplicationMenu(menu);

  ipcMain.on('workspace-info', (event, workspaceInfo) => {
    console.log(workspaceInfo);
    Workspace.create(
      workspaceInfo.workspaceName,
      workspaceInfo.workspacePath[0],
    );
  });
}

try {
  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', createWindow);

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow();
    }
  });
} catch (e) {
  // Catch Error
  // throw e;
}

function prueba(prepath: any) {
  const prpath = 'C:\\Project\\Devon-dist_2.4.0\\software\\devcon';

  Workspace.create('prueba4', prpath);

  // console.log(prepath.split(path.sep));
  // console.log(path.parse(prepath));

  // prepath = 'C:\\Project\\Devon-dist_2.4.0';
  // const configfile = prepath + '\\conf\\settings.json';
  // console.log(configfile);

  // const settingsPath = fs.existsSync(configfile);
  // const workspace = fs.existsSync(prepath + '\\workspaces');
  // console.log('Archivo conf:' + settingsPath + ' Workspaces:' + workspace);
}
