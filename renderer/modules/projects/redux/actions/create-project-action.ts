export type CreateProjectType = 'SET_CREATE_PROJECT';

interface CreateProjectPayload {
  create: {
    loading: boolean;
    success?: boolean;
  };
}

export interface CreateProjectAction {
  type: CreateProjectType;
  payload: CreateProjectPayload;
}

export class CreateProjectActionData implements CreateProjectAction {
  type: CreateProjectType = 'SET_CREATE_PROJECT';
  payload: CreateProjectPayload;

  constructor(loading: boolean, success = false) {
    this.payload = { create: { loading, success } };
  }
}
