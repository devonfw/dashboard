import fs from 'fs';
import path from 'path';
import platform from 'os';

export class ProfileSetupService {
  private profileFilePath = path.resolve(
    platform.homedir(),
    '.devon',
    'dashboard-profile.json'
  );

  getBase64Img(src: string): Promise<string> {
    return new Promise((resolve, reject) => {
      fs.readFile(src, (err, data) => {
        if (err)
          reject(
            'There was an error reading the file. Please try again. ' + err
          );
        const ext = path.extname(src).substring(1);
        const base64Img = `data:image/${ext};base64,${data.toString('base64')}`;
        resolve(base64Img);
      });
    });
  }

  checkProfile(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      fs.access(this.profileFilePath, fs.constants.F_OK, (err) => {
        if (err) resolve(false);
        resolve(true);
      });
    });
  }

  setProfile(profileData: string): Promise<string> {
    return new Promise((resolve, reject) => {
      fs.writeFile(this.profileFilePath, profileData, (err) => {
        if (err) reject('error: ' + err);
        resolve('success');
      });
    });
  }

  getProfile(): Promise<unknown> {
    return new Promise((resolve, reject) => {
      fs.readFile(this.profileFilePath, (err, data) => {
        if (err) reject(err);
        const profileData = JSON.parse(data.toString());
        resolve(profileData);
      });
    });
  }
}
