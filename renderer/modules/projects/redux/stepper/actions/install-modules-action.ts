export type InstallModulesType = 'SET_INSTALL_MODULES';

export interface InstallModulesPayload {
  install: {
    loading: boolean;
    success?: boolean;
  };
}

export interface InstallModulesAction {
  type: InstallModulesType;
  payload: InstallModulesPayload;
}

export class InstallModulesActionData implements InstallModulesAction {
  type: InstallModulesType = 'SET_INSTALL_MODULES';
  payload: InstallModulesPayload;

  constructor(loading: boolean, success = false) {
    this.payload = { install: { loading, success } };
  }
}
