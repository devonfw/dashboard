export type ProjectDataType = 'SET_PROJECT_DATA';

export interface ProjectDataPayload {
  name?: string;
  type?: string;
  path?: string;
  specificArgs?: {
    [key: string]: string | boolean | null | undefined;
  };
}

export interface ProjectDataAction {
  type: ProjectDataType;
  payload: {
    projectData?: ProjectDataPayload;
  };
}

export class ProjectDataActionData implements ProjectDataAction {
  type: ProjectDataType = 'SET_PROJECT_DATA';
  payload: {
    projectData?: ProjectDataPayload;
  };

  constructor(projectData?: ProjectDataPayload) {
    this.payload = { projectData };
  }
}
