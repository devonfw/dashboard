import { ChildProcess } from 'child_process';

export interface ManagerBehaviour {
  installerProcess(): ChildProcess;
  install(): void;
}
