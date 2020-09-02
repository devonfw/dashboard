import { DevonInstancesService } from '../../services/devon-instances/devon-instances.service';
import { DevonfwConfig } from '../../models/devonfw-dists.model';
import { BrowserWindow } from 'electron';
import { DevonUpdateResponse } from '../shared/models/devon-update-response';
import DevonfwIdesService from '../settings/installed-versions/services/devonfw-ides.service';

export function checkForDevonUpdates(mainWindow: BrowserWindow): void {
  new DevonfwIdesService()
    .getLatestDevonfwIDE()
    .then((instance) => {
      getLocalInstalledVersions(mainWindow, instance.version);
    })
    .catch(() => {
      sendUpdateUnavailable(mainWindow);
    });
}

function getLocalInstalledVersions(
  mainWindow: BrowserWindow,
  latestVersion: string
) {
  new DevonInstancesService()
    .getAllUserCreatedDevonInstances()
    .then((instances: DevonfwConfig) => {
      if (instances.distributions.length) {
        const localVersions = instances.distributions.map(
          (i) => i.ideConfig.version
        );
        checkUpdateRequired(mainWindow, localVersions, latestVersion);
      }
    })
    .catch(() => {
      sendUpdateUnavailable(mainWindow);
    });
}

function checkUpdateRequired(
  mainWindow: BrowserWindow,
  localVersions: string[],
  latestVersion: string
) {
  if (!localVersions.includes(latestVersion)) {
    const latestMachineVersion = getLocalLatestVersion(localVersions);
    const response: DevonUpdateResponse = {
      updateAvailable: true,
      latestLocalVersion: latestMachineVersion,
      latestAvailableVersion: latestVersion,
    };
    mainWindow.webContents.send('get:checkForUpdates', response);
  } else sendUpdateUnavailable(mainWindow);
}

function getLocalLatestVersion(versions: string[]) {
  return versions.reduce((currentVersion, maxVersion) =>
    currentVersion > maxVersion ? currentVersion : maxVersion
  );
}

function sendUpdateUnavailable(mainWindow: BrowserWindow) {
  const response: DevonUpdateResponse = {
    updateAvailable: false,
  };
  mainWindow.webContents.send('get:checkForUpdates', response);
}
