// Native
import { join } from 'path';
import { format } from 'url';

// Packages
import { BrowserWindow, app, ipcMain, shell } from 'electron';
import isDev from 'electron-is-dev';
import prepareNext from 'electron-next';

// Other dependencies
import { TerminalService } from './services/terminal/terminal.service';
import { DevonInstancesService } from './services/devon-instances/devon-instances.service';
import { DevonfwConfig, IdeDistribution } from './models/devonfw-dists.model';
import { ProfileSetupService } from './services/profile-setup/profile-setup.service';
import { readdirPromise } from './modules/shared/utils/promised';
import { InstallListener } from './modules/projects/classes/listeners/install-listener';
import { SpawnTerminalFactory } from './modules/projects/classes/terminal/spawn-terminal-factory';
import { ProjectCreationListener } from './modules/projects/classes/listeners/project-creation-listener';
import {
  getBase64Img,
  setDashboardProfile,
  checkProfileStatus,
  getDashboardProfile,
} from './modules/profile-setup/handle-profile-setup';
import { checkForDevonUpdates } from './modules/devon-updates/handle-devon-updates';
import { ProjectDeleteListener } from './modules/projects/classes/listeners/project-delete-listener';
import { OpenProjectIDEListener } from './modules/projects/classes/listeners/open-project-ide-listener';
import { UserProfile } from './modules/shared/models/user-profile';
import { DevonIdeProjectsListener } from './modules/projects/classes/listeners/devon-ide-projects';
import RepositoriesListener from './modules/repositories/repositories-listener';
import IDEsInstallationStatus from './modules/settings/installed-versions/services/ides-installation-status.service';
import DevonfwIdesService from './modules/settings/installed-versions/services/devonfw-ides.service';

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

  mainWindow.loadURL(await getWindowUrl());
  mainWindow.webContents.session.on('will-download', downloadHandler);
  mainWindow.webContents.on('did-fail-load', async () =>
    mainWindow.loadURL(await getWindowUrl())
  );
});

// Quit the app once all windows are closed
app.on('window-all-closed', async () => {
  const profileExists = await new ProfileSetupService().doesProfileExist();
  if (!profileExists) {
    await new ProfileSetupService().createDefaultProfile();
  }
  app.quit();
});

async function getWindowUrl(): Promise<string> {
  const profileSetup = new ProfileSetupService();
  let startPage = 'intro';
  let url = '';

  if (await profileSetup.doesProfileExist()) {
    startPage = 'home';
  }

  if (isDev) {
    url = `http://localhost:8000/${startPage}`;
  } else {
    url = format({
      pathname: join(__dirname, '../../renderer/out', `${startPage}.html`),
      protocol: 'file:',
      slashes: true,
    });
  }

  return url;
}

/* Manage all downloads */
const downloadHandler = (_, item) => {
  item.on('updated', (_, state) => {
    if (state === 'interrupted') {
      item.cancel();
    } else if (state === 'progressing') {
      if (!item.isPaused()) {
        mainWindow.webContents.send('download progress', {
          total: item.getTotalBytes(),
          received: item.getReceivedBytes(),
        });
      }
    }
  });
  item.once('done', (_, state) => {
    mainWindow.webContents.send('download completed', state);
    if (state === 'completed') {
      shell.showItemInFolder(item.getSavePath());
    }
  });
};

// Get all devon-ide-scripts from maven repository
function getDevonIdeScripts() {
  const instancesService = new DevonInstancesService();
  const devonfwIdes = new DevonfwIdesService();
  new IDEsInstallationStatus(instancesService, devonfwIdes)
    .getDevonfwIDEsStatus()
    .then((instances) => {
      mainWindow.webContents.send('get:devonIdeScripts', instances);
    })
    .catch(() => {
      mainWindow.webContents.send('get:devonIdeScripts', []);
    });
}

// Finding out Devonfw Ide Instances
function countInstance() {
  new DevonInstancesService()
    .getAvailableDevonIdeInstances()
    .then((instances) => {
      mainWindow.webContents.send('count:instances', { total: instances });
    })
    .catch((error) => {
      console.log(error);
      mainWindow.webContents.send('count:instances', { total: 0 });
    });
}

// Get all User created Instances
function getDevonInstancesPath() {
  new DevonInstancesService()
    .getAllUserCreatedDevonInstances()
    .then((instancesPath: DevonfwConfig) => {
      mainWindow.webContents.send(
        'get:devoninstances',
        instancesPath.distributions
      );
    })
    .catch((error) => {
      console.log(error);
      // If no instances are available
      const fakeInstance: IdeDistribution = {
        id: process.cwd(),
        ideConfig: {
          basepath: process.cwd(),
          commands: '',
          version: '',
          workspaces: process.cwd() + '\\workspaces',
        },
      };
      mainWindow.webContents.send('get:devoninstances', [fakeInstance]);
    });
}

export function findOutWorkspaceLocation(paths: string[]): string[] {
  const workspaces = [];
  let location = '';
  for (const path of paths) {
    if (path.includes('workspaces')) {
      location = path.substring(
        path.lastIndexOf('workspaces') + 10,
        -path.length
      );
      if (!workspaces.includes(location)) {
        workspaces.push(location);
      }
    } else {
      location = path + '\\workspaces';
      if (!workspaces.includes(location)) {
        workspaces.push(location);
      }
    }
  }
  return workspaces;
}

function getWorkspaceProject(workspacelocation: string) {
  readdirPromise(workspacelocation)
    .then((projects: string[]) => {
      mainWindow.webContents.send('get:workspaceProjects', projects);
    })
    .catch(() => {
      mainWindow.webContents.send('get:workspaceProjects', []);
    });
}

function getProjectDetails() {
  new DevonInstancesService().readFile().then((details) => {
    mainWindow.webContents.send('get:projectDetails', details);
  });
}

/* Enable services */

new InstallListener(new SpawnTerminalFactory()).listen();

new ProjectCreationListener(
  new SpawnTerminalFactory(),
  new DevonInstancesService()
).listen();

new RepositoriesListener().listen();

// Deleting a project process
new ProjectDeleteListener(new DevonInstancesService()).listen();

// Open a project in IDE process
new OpenProjectIDEListener(new DevonInstancesService()).listen();

// Getting all the project depebding on Devonfw IDE selector
new DevonIdeProjectsListener(new DevonInstancesService()).listen();

const openProjectDirectory = (path: string) => {
  shell.showItemInFolder(path);
};

/* terminal service */
const terminalService = new TerminalService();
terminalService.openDialog(['openDirectory'], []);
terminalService.allCommands(null, null);

// Finding out Devonfw Ide
ipcMain.on('find:devonfw', countInstance);
ipcMain.on('find:devonfwInstances', getDevonInstancesPath);
ipcMain.on('find:checkForUpdates', () => checkForDevonUpdates(mainWindow));
ipcMain.on('find:workspaceProjects', (e, option) => {
  getWorkspaceProject(option);
});
ipcMain.on('find:projectDetails', getProjectDetails);
ipcMain.on('fetch:devonIdeScripts', getDevonIdeScripts);
ipcMain.on('open:projectDirectory', (e, path) => {
  openProjectDirectory(path);
});
ipcMain.on('set:base64Img', (e, arg) => getBase64Img(arg, mainWindow));
ipcMain.on('set:profile', (e, profile: UserProfile) =>
  setDashboardProfile(profile, mainWindow)
);
ipcMain.on('find:profileStatus', () => checkProfileStatus(mainWindow));
ipcMain.on('find:profile', () => getDashboardProfile(mainWindow));
