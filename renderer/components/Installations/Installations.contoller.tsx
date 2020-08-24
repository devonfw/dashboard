import { Component, ChangeEvent } from 'react';
import InstallationsView from './Installations.view';
import { IpcRendererEvent } from 'electron';

export interface DevonIdeScripts {
  id: number;
  version: string;
  updated: string;
  downloading?: boolean;
  installed?: boolean;
}

interface TableState {
  page: number;
  rowsPerPage: number;
}

interface InstallationsState {
  query?: string;
  installations?: DevonIdeScripts[];
  tableState?: TableState;
}

export default class Installations extends Component<
  unknown,
  InstallationsState
> {
  state = {
    query: '',
    installations: [],
    tableState: {
      page: 0,
      rowsPerPage: 5,
    },
  };
  allInstallations: DevonIdeScripts[] = [];

  constructor(props: unknown) {
    super(props);
  }

  componentDidMount(): void {
    this.getInstallations();
    this.downloadCompleteHandler();
  }

  componentWillUnmount(): void {
    global.ipcRenderer.removeAllListeners('get:devonIdeScripts');
    global.ipcRenderer.removeAllListeners('get:devoninstances');
    global.ipcRenderer.removeAllListeners('download completed');
  }

  getFormattedDate(d: Date): string {
    const releaseDate = new Date(d);
    return (
      releaseDate.toLocaleString('default', { day: '2-digit' }) +
      '-' +
      releaseDate.toLocaleString('default', { month: 'short' }) +
      '-' +
      releaseDate.getFullYear()
    );
  }

  getInstallations = (): void => {
    global.ipcRenderer.send('fetch:devonIdeScripts');
    global.ipcRenderer.on(
      'get:devonIdeScripts',
      (event: IpcRendererEvent, arg: any) => {
        const installations = arg.map((a: any, index: number) => {
          a.id = index;
          a.downloading = false;
          a.installed = false;
          a.updated = this.getFormattedDate(a.updated);
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
          a.installed = installedVersions.includes(a.version);
          return a;
        });
        this.setState({ installations });
        this.allInstallations.push(...installations);
      }
    );
  };

  queryHandler = (event: ChangeEvent<{ value: unknown }>): void => {
    const query: string = event.target.value as string;
    const installations: DevonIdeScripts[] = this.allInstallations.filter((i) =>
      i.version.includes(query)
    );
    const tableState: TableState = {
      page: 0,
      rowsPerPage: this.state.tableState.rowsPerPage,
    };
    this.setState({ query, installations, tableState });
  };

  downloadHandler = (index: number): void => {
    const installations = this.state.installations.map((i: DevonIdeScripts) => {
      i.downloading = i.id === index;
      return i;
    });
    this.setState({ installations });
  };

  downloadCompleteHandler = (): void => {
    global.ipcRenderer.on('download completed', () => {
      const installations = this.state.installations.map(
        (i: DevonIdeScripts) => {
          i.downloading = false;
          return i;
        }
      );
      this.setState({ installations });
    });
  };

  handlePageChange = (event: unknown, newPage: number): void => {
    const tableState: TableState = {
      page: newPage,
      rowsPerPage: this.state.tableState.rowsPerPage,
    };
    this.setState({ tableState });
  };

  handleRowsPerPageChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const tableState: TableState = {
      page: 0,
      rowsPerPage: parseInt(event.target.value, 10),
    };
    this.setState({ tableState });
  };

  render(): JSX.Element {
    return (
      <InstallationsView
        queryHandler={this.queryHandler}
        query={this.state.query}
        installations={this.state.installations}
        downloadHandler={this.downloadHandler}
        page={this.state.tableState.page}
        rowsPerPage={this.state.tableState.rowsPerPage}
        handlePageChange={this.handlePageChange}
        handleRowsPerPageChange={this.handleRowsPerPageChange}
      ></InstallationsView>
    );
  }
}
