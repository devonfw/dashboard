export interface ProjectDetails {
  name: string;
  domain?: string;
  date?: string;
  path?: string;
}

export interface ProcessState {
  stdout: string;
  stderr: string;
}

export interface ProcessHandlerMessage {
  data: ProcessState | string;
  message: string;
}
