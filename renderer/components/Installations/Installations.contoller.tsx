import { Component, ChangeEvent } from 'react';
import InstallationsView from './Installations.view';
import { IpcRendererEvent } from 'electron';

export interface DevonIdeScripts {
  version: string;
  updated: Date;
  downloading?: boolean;
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
  }

  getInstallations = (): void => {
    global.ipcRenderer.send('fetch:devonIdeScripts');
    global.ipcRenderer.on(
      'get:devonIdeScripts',
      (event: IpcRendererEvent, arg: any) => {
        const installations = arg.map((a: any) => {
          a.downloading = false;
          return a;
        });
        this.setState({ installations });
        this.allInstallations.push(...arg);
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
