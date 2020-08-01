import { Component, ChangeEvent } from 'react';
import InstallationsView from './Installations.view';
import { IpcRendererEvent } from 'electron';

export interface DevonIdeScripts {
  version: string;
  updated: Date;
  downloading?: boolean;
  installed?: boolean;
}

interface InstallationsState {
  query?: string;
  installations?: DevonIdeScripts[];
}

export default class Installations extends Component<
  unknown,
  InstallationsState
> {
  state = {
    query: '',
    installations: [],
  };
  allInstallations: DevonIdeScripts[] = [];

  constructor(props: unknown) {
    super(props);
  }

  componentDidMount(): void {
    this.getInstallations();
  }

  componentWillUnmount(): void {
    global.ipcRenderer.removeAllListeners('get:devonIdeScripts');
    global.ipcRenderer.removeAllListeners('get:devoninstances');
  }

  getInstallations = (): void => {
    global.ipcRenderer.send('fetch:devonIdeScripts');
    global.ipcRenderer.on(
      'get:devonIdeScripts',
      (event: IpcRendererEvent, arg: any) => {
        const installations = arg.map((a: any) => {
          a.downloading = false;
          a.installed = false;
          return a;
        });
        this.updateDownloadedInstallations(installations);
      }
    );
  };

  updateDownloadedInstallations = (mavenScripts: any): void => {
    global.ipcRenderer.send('find:devonfwInstances');
    global.ipcRenderer.on(
      'get:devoninstances',
      (event: IpcRendererEvent, arg: any) => {
        const installedVersions = arg.map((a: any) => a.ideConfig.version);
        const installations = mavenScripts.map((a: any) => {
          a.installed = installedVersions.includes(a.version) ? true : false;
          return a;
        });
        this.setState({ installations });
        this.allInstallations.push(...installations);
      }
    );
  };

  handleQuery = (event: ChangeEvent<{ value: unknown }>): void => {
    const query: string = event.target.value as string;
    const installations: DevonIdeScripts[] = this.allInstallations.filter((i) =>
      i.version.includes(query)
    );
    this.setState({ query });
    this.setState({ installations });
  };

  render(): JSX.Element {
    return (
      <InstallationsView
        handleQuery={this.handleQuery}
        query={this.state.query}
        installations={this.state.installations}
      ></InstallationsView>
    );
  }
}
