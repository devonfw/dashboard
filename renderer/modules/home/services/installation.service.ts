import { InstallFormState } from '../redux/install-form';
import { StopListener } from '../../shared/services/renderer/renderer.service';

const CHANNEL = 'install-ide';

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

  private stopListener() {
    global.ipcRenderer.removeAllListeners(CHANNEL);
  }
}
