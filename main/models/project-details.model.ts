export interface ProjectDetails {
  name: string;
  domain?: string;
  date?: string;
  path?: string;
  workspace?: string;
}

export interface ProcessState {
  stdout: string;
  stderr: string;
}

export interface ProcessHandlerMessage {
  data: ProcessState | string;
  message: string;
}
