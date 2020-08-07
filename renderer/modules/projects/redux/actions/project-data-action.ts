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
