// Native
import { join } from 'path';
import { format } from 'url';
import { IpcMainEvent } from 'electron';
import { spawn, exec, StdioOptions, SpawnOptions } from 'child_process';

// Packages
import { BrowserWindow, app, ipcMain } from 'electron';
import isDev from 'electron-is-dev';
import prepareNext from 'electron-next';

// Other dependencies
import { TerminalService } from './services/terminal/terminal.service';
import installExtension, { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer';
import { CommandRetrieverService } from './services/command-retriever/command-retriever.service';

installExtension(REACT_DEVELOPER_TOOLS)
    .then((name) => console.log(`Added Extension:  ${name}`))
    .catch((err) => console.log('An error occurred: ', err));

// Prepare the renderer once the app is ready
app.on('ready', async () => {
  await prepareNext('./renderer')

  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      preload: join(__dirname, 'preload.js'),
    },
  })

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  const url = isDev
    ? 'http://localhost:8000/start'
    : format({
      pathname: join(__dirname, '../../renderer/start.html'),
      protocol: 'file:',
      slashes: true,
    })

  mainWindow.loadURL(url)
})

// Quit the app once all windows are closed
app.on('window-all-closed', app.quit);




/* Enable services */

/* terminal powershell */
const eventHandler = (event: IpcMainEvent, ...eventArgs: any[]) => {
  const command = eventArgs[0];
  const cwd = eventArgs[1];
  console.log('received message:' + command)

  if (!command) event.sender.send('terminal/powershell', '');
  const stdioOptions: StdioOptions = ['pipe', 'pipe', 'pipe'];

  let options: SpawnOptions = { stdio: stdioOptions };
  options = cwd ? { ...options, cwd } : options
  const terminal = spawn(`powershell.exe`, [], options);

  terminal.stdout.on('data', data => {
    console.log('sending data: ' + data.toString())
    event.sender.send('terminal/powershell', data.toString())
  });
  terminal.stderr.on('data', data => console.error(data.toString()));
  terminal.on('close', () => {
    console.log('closed stream')
  });

  terminal.stdin.write(command + "\n")
}

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
commandRetrieverService.getCommands();





