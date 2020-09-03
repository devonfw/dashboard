import { Component, ChangeEvent } from 'react';
import InstallationsView from './Installations.view';
import { IpcRendererEvent } from 'electron';

export interface DevonIdeScript {
  id: string;
  version: string;
  updated: string;
  installed: boolean;
  changelog: string | null;
  downloading: boolean;
}

interface TableState {
  page: number;
  rowsPerPage: number;
}

interface InstallationsState {
  query?: string;
  installations: DevonIdeScript[];
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
  allInstallations: DevonIdeScript[] = [];

  constructor(props: unknown) {
    super(props);
  }

  componentDidMount(): void {
    this.getInstallations();
    this.downloadCompleteHandler();
  }

  componentWillUnmount(): void {
    global.ipcRenderer.removeAllListeners('get:devonIdeScripts');
    global.ipcRenderer.removeAllListeners('download completed');
  }

  getInstallations = (): void => {
    global.ipcRenderer.send('fetch:devonIdeScripts');
    global.ipcRenderer.on(
      'get:devonIdeScripts',
      (_: IpcRendererEvent, installations: DevonIdeScript) => {
        this.setState((prev) => ({
          installations: [...prev.installations, installations],
          query: '',
        }));
        this.allInstallations.push(installations);
      }
    );
  };

  queryHandler = (event: ChangeEvent<{ value: unknown }>): void => {
    const query: string = event.target.value as string;
    const installations: DevonIdeScript[] = this.allInstallations.filter((i) =>
      i.version.includes(query)
    );
    const tableState: TableState = {
      page: 0,
      rowsPerPage: this.state.tableState.rowsPerPage,
    };
    this.setState({ query, installations, tableState });
  };

  downloadHandler = (index: string): void => {
    const installations = this.state.installations.map((i: DevonIdeScript) => {
      i.downloading = i.id === index;
      return i;
    });
    this.setState({ installations });
  };

  downloadCompleteHandler = (): void => {
    global.ipcRenderer.on('download completed', () => {
      const installations = this.state.installations.map(
        (i: DevonIdeScript) => {
          i.downloading = false;
          return i;
        }
      );
      this.setState({ installations });
    });
  };

  handlePageChange = (_: unknown, newPage: number): void => {
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
