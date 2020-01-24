export type NotificationActionType = 'ADD_NOTIFICATION' | 'REMOVE_NOTIFICATION';

export interface NotificationsAction {
  type: NotificationsActionType;
  payload?: {
    notifications: string;
  };
}
