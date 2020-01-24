export type NotificationsActionAdd = {
  type: 'ADD_NOTIFICATION';
  payload: {
    notification: string;
  };
};

export type NotificationsActionDelete = {
  type: 'DELETE_NOTIFICATION';
  payload: {
    notification: string;
  };
};

export type NotificationsAction =
  | NotificationsActionAdd
  | NotificationsActionDelete;
