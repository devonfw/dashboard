"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var path = require("path");
var url = require("url");
var exec = require('child_process').exec;
// Create de Main Menu Template
// import { mainMenuTemplate } from './mainMenuTemplate';
var mainMenuTemplate = [
    {
        label: 'System',
        submenu: [
            { label: 'Configure Environment', click: function () { } },
            { label: 'Install Devcon', click: function () { } },
            {
                label: 'Exit',
                click: function () {
                    electron_1.app.quit();
                },
            },
        ],
    },
    {
        label: 'Github',
        submenu: [
            { label: 'Devon Code', click: function () { } },
            { label: 'Oasp4j', click: function () { } },
        ],
    },
    {
        label: 'Oasp4j',
        submenu: [
            { label: 'Build', click: function () { } },
            { label: 'Create', click: function () { } },
            { label: 'Deploy', click: function () { } },
            { label: 'Run', click: function () { } },
        ],
    },
    {
        label: 'Dist',
        submenu: [
            { label: 'Info', click: function () { } },
            { label: 'Init', click: function () { } },
            { label: 'Install', click: function () { } },
            { label: 'S2', click: function () { } },
        ],
    },
    {
        label: 'Doc',
        submenu: [
            {
                label: 'Devon',
                click: function () {
                    MenuNavigation('doc/devon');
                },
            },
            {
                label: 'Devon Guide',
                click: function () {
                    MenuNavigation('doc/devonguide');
                },
            },
            { label: 'Get Started', click: function () { } },
            { label: 'Links', click: function () { } },
            { label: 'Oasp4j Guide', click: function () { } },
            { label: 'User Guide', click: function () { } },
        ],
    },
    {
        label: 'Help',
        submenu: [
            { label: 'Command', click: function () { } },
            { label: 'Module', click: function () { } },
            { label: 'Overview', click: function () { } },
            { label: 'User Guide', click: function () { } },
        ],
    },
    {
        label: 'Oasp4js',
        submenu: [
            { label: 'Build', click: function () { } },
            { label: 'Create', click: function () { } },
            { label: 'Run', click: function () { } },
        ],
    },
    {
        label: 'Project',
        submenu: [
            { label: 'Build', click: function () { } },
            { label: 'Create', click: function () { } },
            { label: 'Run', click: function () { } },
        ],
    },
    { label: 'Workspace', submenu: [{ label: 'Create', click: function () { } }] },
];
var win, serve;
var args = process.argv.slice(1);
serve = args.some(function (val) { return val === '--serve'; });
function createWindow() {
    var electronScreen = electron_1.screen;
    var size = electronScreen.getPrimaryDisplay().workAreaSize;
    // Create the browser window.
    win = new electron_1.BrowserWindow({
        x: 0,
        y: 0,
        width: size.width,
        height: size.height,
    });
    if (serve) {
        require('electron-reload')(__dirname, {
            electron: require(__dirname + "/node_modules/electron"),
        });
        win.loadURL('http://localhost:4200');
    }
    else {
        win.loadURL(url.format({
            pathname: path.join(__dirname, 'dist/index.html'),
            protocol: 'file:',
            slashes: true,
        }));
    }
    win.webContents.openDevTools();
    win.maximize();
    electron_1.ipcMain.on('angular-async:command', function (event, arg) {
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
                electron_1.ipcMain.on('angular-async:devonsite', function (e) {
                    var devonsite = exec('java -jar src/assets/devcon.jar doc devon', function (error, stdout, stderr) {
                        console.log('Output -->' + stdout);
                        if (error !== null) {
                            console.log('Error ->' + error);
                        }
                    });
                });
                break;
            }
            case 'devonguide': {
                electron_1.ipcMain.on('angular-async:devonguide', function (e) {
                    var devonsite = exec('java -jar src/assets/devcon.jar doc devonguide', function (error, stdout, stderr) {
                        console.log('Output -->' + stdout);
                        if (error !== null) {
                            console.log('Error ->' + error);
                        }
                    });
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
    win.on('closed', function () {
        // Dereference the window object, usually you would store window
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null;
    });
    // Create the Main Menu from the previusly defined template
    var mainMenu = electron_1.Menu.buildFromTemplate(mainMenuTemplate);
    // Apply the menu to de main window
    electron_1.Menu.setApplicationMenu(mainMenu);
}
function MenuNavigation(NavigationRoute) {
    if (serve) {
        require('electron-reload')(__dirname, {
            electron: require(__dirname + "/node_modules/electron"),
        });
        win.loadURL('http://localhost:4200/#/' + NavigationRoute);
    }
    else {
        win.loadURL(url.format({
            pathname: path.join(__dirname, 'dist/index.html/' + NavigationRoute),
            protocol: 'file:',
            slashes: true,
        }));
    }
}
try {
    // This method will be called when Electron has finished
    // initialization and is ready to create browser windows.
    // Some APIs can only be used after this event occurs.
    electron_1.app.on('ready', createWindow);
    // Quit when all windows are closed.
    electron_1.app.on('window-all-closed', function () {
        // On OS X it is common for applications and their menu bar
        // to stay active until the user quits explicitly with Cmd + Q
        if (process.platform !== 'darwin') {
            electron_1.app.quit();
        }
    });
    electron_1.app.on('activate', function () {
        // On OS X it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (win === null) {
            createWindow();
        }
    });
    win.on('closed', function () {
        electron_1.app.quit();
    });
}
catch (e) {
    // Catch Error
    // throw e;
}
//# sourceMappingURL=main.js.map