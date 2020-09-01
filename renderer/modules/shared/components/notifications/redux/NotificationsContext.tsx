import * as React from 'react';
import { NotificationsAction } from './NotificationsActions';

interface NotificationsState {
  notifications: string[];
}

const initialState: NotificationsState = {
  notifications: [
    'Eclipse load complete!',
    'Finished copying projects to workspace',
  ],
};

const reducer = (
  state: NotificationsState = initialState,
  action: NotificationsAction
) => {
  switch (action.type) {
    case 'ADD_NOTIFICATION': {
      return {
        notifications: [...state.notifications, action.payload.notification],
      };
    }

    case 'DELETE_NOTIFICATION': {
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
  dispatch: () => null,
});

export const NotificationsConsumer = NotificationsContext.Consumer;

interface NotificationsProps {
  children: JSX.Element;
}

export function NotificationsProvider(props: NotificationsProps): JSX.Element {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const value = { state, dispatch };
  return (
    <NotificationsContext.Provider value={value}>
      {props.children}
    </NotificationsContext.Provider>
  );
}
