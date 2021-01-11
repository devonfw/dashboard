import { ProfileData } from '../../../../../models/dashboard/profile-data';

export type UserProfileType = 'USER_PROFILE';

export interface UserProfileAction {
  type: UserProfileType;
  payload: {
    userProfile: ProfileData;
  };
}
