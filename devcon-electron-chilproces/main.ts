import { app, BrowserWindow, screen, Menu, ipcMain } from 'electron';
import * as path from 'path';
import * as url from 'url';

const exec = require('child_process').exec;

// Create de Main Menu Template
// import { mainMenuTemplate } from './mainMenuTemplate';

const mainMenuTemplate = [
  {
    label: 'System',
    submenu: [
      { label: 'Configure Environment', click() {} },
      { label: 'Install Devcon', click() {} },
      {
        label: 'Exit',
        click() {
          app.quit();
        },
      },
    ],
  },
  {
    label: 'Github',
    submenu: [
      { label: 'Devon Code', click() {} },
      { label: 'Oasp4j', click() {} },
    ],
  },
  {
    label: 'Oasp4j',
    submenu: [
      { label: 'Build', click() {} },
      { label: 'Create', click() {} },
      { label: 'Deploy', click() {} },
      { label: 'Run', click() {} },
    ],
  },
  {
    label: 'Dist',
    submenu: [
      { label: 'Info', click() {} },
      { label: 'Init', click() {} },
      { label: 'Install', click() {} },
      { label: 'S2', click() {} },
    ],
  },
  {
    label: 'Doc',
    submenu: [
      {
        label: 'Devon',
        click() {
          MenuNavigation('doc/devon');
        },
      },
      {
        label: 'Devon Guide',
        click() {
          MenuNavigation('doc/devonguide');
        },
      },
      { label: 'Get Started', click() {} },
      { label: 'Links', click() {} },
      { label: 'Oasp4j Guide', click() {} },
      { label: 'User Guide', click() {} },
    ],
  },
  {
    label: 'Help',
    submenu: [
      { label: 'Command', click() {} },
      { label: 'Module', click() {} },
      { label: 'Overview', click() {} },
      { label: 'User Guide', click() {} },
    ],
  },
  {
    label: 'Oasp4js',
    submenu: [
      { label: 'Build', click() {} },
      { label: 'Create', click() {} },
      { label: 'Run', click() {} },
    ],
  },
  {
    label: 'Project',
    submenu: [
      { label: 'Build', click() {} },
      { label: 'Create', click() {} },
      { label: 'Run', click() {} },
    ],
  },
  { label: 'Workspace', submenu: [{ label: 'Create', click() {} }] },
];

let win, serve;
const args = process.argv.slice(1);
serve = args.some((val) => val === '--serve');

function createWindow() {
  const electronScreen = screen;
  const size = electronScreen.getPrimaryDisplay().workAreaSize;

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

  win.maximize();

  ipcMain.on('angular-async:command', (event, arg) => {
    console.log(arg);

    switch (arg) {
      case 'devon': {
        // Child process creation
        // const devonhelp = exec(
        //   'java -jar src/assets/devcon.jar doc devon --help',
        //   function(error, stdout, stderr) {
        //     console.log('Output -->' + stdout);
        //     event.sender.send('electron-async-rep:devon', stdout);
        //     if (error !== null) {
        //       console.log('Error ->' + error);
        //     }
        //   },
        // );
        ipcMain.on('angular-async:devonsite', (e) => {
          const devonsite = exec(
            'java -jar src/assets/devcon.jar doc devon',
            function(error, stdout, stderr) {
              console.log('Output -->' + stdout);
              if (error !== null) {
                console.log('Error ->' + error);
              }
            },
          );
        });
        break;
      }
      case 'devonguide': {
        ipcMain.on('angular-async:devonguide', (e) => {
          const devonsite = exec(
            'java -jar src/assets/devcon.jar doc devonguide',
            function(error, stdout, stderr) {
              console.log('Output -->' + stdout);
              if (error !== null) {
                console.log('Error ->' + error);
              }
            },
          );
        });
        break;
      }
      case 'getstarted': {
        break;
      }
      case 'links': {
        break;
      }
      case 'oasp4jguide': {
        break;
      }
      case 'userguide': {
        break;
      }
    }
  });

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store window
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });
  // Create the Main Menu from the previusly defined template
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);

  // Apply the menu to de main window
  Menu.setApplicationMenu(mainMenu);
}

function MenuNavigation(NavigationRoute) {
  if (serve) {
    require('electron-reload')(__dirname, {
      electron: require(`${__dirname}/node_modules/electron`),
    });
    win.loadURL('http://localhost:4200/#/' + NavigationRoute);
  } else {
    win.loadURL(
      url.format({
        pathname: path.join(__dirname, 'dist/index.html/' + NavigationRoute),
        protocol: 'file:',
        slashes: true,
      }),
    );
  }
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
  win.on('closed', function() {
    app.quit();
  });
} catch (e) {
  // Catch Error
  // throw e;
}
