import fs from 'fs';
import path from 'path';
import platform from 'os';
import { UserProfile } from '../../modules/shared/models/user-profile';

const defaultUser: UserProfile = {
  name: 'Unknown User',
  image: '/static/assets/user.png',
  gender: 'male',
  role: 'Undefined Role',
};

export class ProfileSetupService {
  private profileFilePath = path.resolve(
    platform.homedir(),
    '.devon',
    'dashboard-profile.json'
  );

  createDefaultProfile(): Promise<string> {
    return this.setProfile(defaultUser);
  }

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

  doesProfileExist(): Promise<boolean> {
    return new Promise((resolve) => {
      fs.access(this.profileFilePath, fs.constants.F_OK, (err) => {
        if (err) resolve(false);
        resolve(true);
      });
    });
  }

  setProfile(profileData: UserProfile): Promise<string> {
    const profile = JSON.stringify(profileData);

    return new Promise((resolve, reject) => {
      fs.writeFile(this.profileFilePath, profile, (err) => {
        if (err) reject('error: ' + err);
        resolve('success');
      });
    });
  }

  getProfile(): Promise<UserProfile> {
    return new Promise((resolve) => {
      fs.readFile(this.profileFilePath, (err, data) => {
        if (err) resolve(defaultUser);
        const profileData = data ? JSON.parse(data.toString()) : defaultUser;
        resolve(profileData);
      });
    });
  }
}
