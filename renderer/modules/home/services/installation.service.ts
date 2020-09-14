import { InstallFormState } from '../redux/install-form';
import { StopListener } from '../../shared/services/renderer/renderer.service';

const CHANNEL = 'install-ide';
const CANCEL_CHANNEL = `${CHANNEL}:cancel`;

export interface InstallationStatus {
  finished: boolean;
  error: boolean;
  message: string;
}

export default class InstallationService {
  install(
    handler: (data?: InstallationStatus) => void,
    options: InstallFormState
  ): StopListener {
    const channelHandler = (_: unknown, data: InstallationStatus) => {
      if (data.finished) {
        this.stopListener();
      }
      handler(data);
    };
    global.ipcRenderer.on(CHANNEL, channelHandler);
    global.ipcRenderer.send(CHANNEL, options);

    return this.stopListener;
  }

  cancel(): void {
    global.ipcRenderer.send(CANCEL_CHANNEL);
  }

  private stopListener() {
    global.ipcRenderer.removeAllListeners(CHANNEL);
  }
}
