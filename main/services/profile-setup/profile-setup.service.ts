import fs from 'fs';
import path from 'path';
import { UserProfile } from '../../modules/shared/models/user-profile';
import { profileFilePath } from '../../modules/shared/config/paths';

const defaultUser: UserProfile = {
  name: 'Unknown User',
  image: '/static/assets/user.png',
  gender: 'male',
  role: 'Undefined Role',
};

export class ProfileSetupService {
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
      fs.access(profileFilePath, fs.constants.F_OK, (err) => {
        if (err) resolve(false);
        resolve(true);
      });
    });
  }

  setProfile(profileData: UserProfile): Promise<string> {
    const validatedProfile = this.validateProfile(profileData);
    const profile = JSON.stringify(validatedProfile);

    return new Promise((resolve, reject) => {
      fs.writeFile(profileFilePath, profile, (err) => {
        if (err) reject('error: ' + err);
        resolve('success');
      });
    });
  }

  getProfile(): Promise<UserProfile> {
    return new Promise((resolve) => {
      fs.readFile(profileFilePath, (err, data) => {
        if (err) resolve(defaultUser);
        const profileData = data ? JSON.parse(data.toString()) : defaultUser;
        resolve(profileData);
      });
    });
  }

  validateProfile(profile: UserProfile): UserProfile {
    const validatedProfile: UserProfile = {
      name: profile.name || defaultUser.name,
      image: profile.image || defaultUser.image,
      gender: profile.gender || defaultUser.gender,
      role: profile.role || defaultUser.role,
    };
    return validatedProfile;
  }
}
