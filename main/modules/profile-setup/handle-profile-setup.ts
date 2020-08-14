import { ProfileSetupService } from '../../services/profile-setup/profile-setup.service';
import { BrowserWindow } from 'electron';

// Get base64 image when user selects profile picture
export function getBase64Img(src: string, mainWindow: BrowserWindow): void {
  new ProfileSetupService()
    .getBase64Img(src)
    .then((outputImg) => {
      mainWindow.webContents.send('get:base64Img', outputImg);
    })
    .catch((error) => {
      mainWindow.webContents.send('get:base64Img', '');
    });
}

// Create or update Dashboard user profile
export function setDashboardProfile(
  data: string,
  mainWindow: BrowserWindow
): void {
  new ProfileSetupService()
    .setProfile(data)
    .then((status) => {
      mainWindow.webContents.send('get:profileCreationStatus', status);
    })
    .catch((error) => {
      mainWindow.webContents.send('get:profileCreationStatus', error);
    });
}

// Check if dashboard profile file exists
export function checkProfileStatus(mainWindow: BrowserWindow): void {
  new ProfileSetupService()
    .checkProfile()
    .then((exists) => {
      mainWindow.webContents.send('get:profileStatus', exists);
    })
    .catch((error) => {
      mainWindow.webContents.send('get:profileStatus', false);
    });
}

// Check if dashboard profile file exists
export function getDashboardProfile(mainWindow: BrowserWindow): void {
  new ProfileSetupService()
    .getProfile()
    .then((data) => {
      mainWindow.webContents.send('get:profile', data);
    })
    .catch((error) => {
      mainWindow.webContents.send('get:profile', {});
    });
}
