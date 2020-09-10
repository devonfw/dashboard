import { Component, ChangeEvent } from 'react';
import InstallationsView from './Installations.view';
import { IpcRendererEvent } from 'electron';
import ConfirmDialog from '../../../../shared/components/confirm-dialog/confirm.dialog';

export interface DevonIdeScript {
  version: string;
  path?: string;
  updated: string;
  url?: string;
  changelog: string | null;
}

interface TableState {
  page: number;
  rowsPerPage: number;
}

interface InstallationsState {
  query?: string;
  installations: DevonIdeScript[];
  tableState?: TableState;
  loading: boolean;
  openConfirmDialog?: boolean;
  uninstallIdePath?: string;
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
    loading: false,
    openConfirmDialog: false,
    uninstallIdePath: '',
  };
  allInstallations: DevonIdeScript[] = [];

  constructor(props: unknown) {
    super(props);
  }

  dialogTitle = 'Uninstalling IDE';
  dialogContent =
    'Devonfw Dashboard will no longer keep track of this IDE. Are you sure?';

  componentDidMount(): void {
    global.ipcRenderer.send('fetch:devonIdeScripts');
    this.setState({ loading: true });
    this.getInstallations();
  }

  componentWillUnmount(): void {
    global.ipcRenderer.removeAllListeners('get:devonIdeScripts');
  }

  getInstallations = (): void => {
    global.ipcRenderer.on(
      'get:devonIdeScripts',
      (_: IpcRendererEvent, installations: DevonIdeScript) => {
        this.setState((prev) => {
          return {
            installations: [...prev.installations, installations],
            query: '',
            loading: false,
          };
        });
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

  confirmUninstall = (idePath: string): void => {
    this.setState({ openConfirmDialog: true, uninstallIdePath: idePath });
  };

  handleCloseDialog = (confirm: boolean): void => {
    this.setState({ openConfirmDialog: false });
    if (confirm) this.uninstallIde(this.state.uninstallIdePath);
    else this.setState({ uninstallIdePath: '' });
  };

  uninstallIde = (path?: string): void => {
    global.ipcRenderer
      .invoke('uninstall:ide', path)
      .then((success: boolean) => {
        if (success) {
          this.setState({
            installations: [],
            loading: true,
            uninstallIdePath: '',
          });
          this.allInstallations = [];
          global.ipcRenderer.send('fetch:devonIdeScripts');
          global.ipcRenderer.send('find:devonfwInstances');
        }
      });
  };

  handleViewIde = (idePath: string): void => {
    global.ipcRenderer.invoke('view:ide', idePath);
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
      <>
        <InstallationsView
          query={this.state.query}
          loading={this.state.loading}
          installations={this.state.installations}
          page={this.state.tableState.page}
          rowsPerPage={this.state.tableState.rowsPerPage}
          queryHandler={this.queryHandler}
          uninstallHandler={this.confirmUninstall}
          viewIdeHandler={this.handleViewIde}
          handlePageChange={this.handlePageChange}
          handleRowsPerPageChange={this.handleRowsPerPageChange}
        ></InstallationsView>
        <ConfirmDialog
          title={this.dialogTitle}
          content={this.dialogContent}
          openDialog={this.state.openConfirmDialog}
          onClose={this.handleCloseDialog}
        ></ConfirmDialog>
      </>
    );
  }
}
