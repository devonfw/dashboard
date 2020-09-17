import { UserProfile } from '../../modules/shared/models/user-profile';
import { profileFilePath } from '../../modules/shared/config/paths';
import path from 'path';
import File from '../../modules/shared/classes/file';

const defaultUser: UserProfile = {
  name: 'Unknown User',
  image: '/static/assets/user.png',
  gender: 'male',
  role: 'Undefined Role',
};

export class ProfileSetupService {
  profileFile: File;

  constructor() {
    this.profileFile = new File(profileFilePath);
  }

  async setProfile(profileData: UserProfile): Promise<string> {
    const profile = this.validateProfile(profileData);

    try {
      await this.profileFile.writeObject(profile);
      return 'success';
    } catch (err) {
      throw new Error('error:' + err);
    }
  }

  async getProfile(): Promise<UserProfile> {
    try {
      const profile = await this.profileFile.readObject<UserProfile>();
      return profile;
    } catch (_) {
      return defaultUser;
    }
  }

  doesProfileExist(): Promise<boolean> {
    return this.profileFile.exists();
  }

  createDefaultProfile(): Promise<string> {
    return this.setProfile(defaultUser);
  }

  async getBase64Img(src: string): Promise<string> {
    try {
      const image = new File(src);
      const data = await image.read();
      const ext = path.extname(src).substring(1);
      const base64Img = `data:image/${ext};base64,${data.toString('base64')}`;
      return base64Img;
    } catch (err) {
      return 'Error reading image';
    }
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
