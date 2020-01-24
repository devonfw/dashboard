import * as React from 'react';
import { NotificationsAction } from './NotificationsActions';

interface NotificationsState {
  notifications: string[] | undefined;
}

const initialState: NotificationsState = {
  notifications: [],
};

const reducer = (
  state: NotificationsState = initialState,
  action: NotificationsAction,
) => {
  switch (action.type) {
    case 'ADD_NOTIFICATION': {
      return {
        ...state,
      };
    }

    case 'REMOVE_NOTIFICATION': {
      return {
        ...state,
      };
    }
    default:
      throw new Error();
  }
};

export interface INotificationsContext {
  state: NotificationsState;
  dispatch: (action: NotificationsAction) => void;
}

export const NotificationsContext = React.createContext<INotificationsContext>({
  state: initialState,
  dispatch: () => {},
});
export const NotificationsConsumer = NotificationsContext.Consumer;

export function NotificationProvider(props: any) {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const value = { state, dispatch };
  return (
    <NotificationsContext.Provider value={value}>
      {props.children}
    </NotificationsContext.Provider>
  );
}
