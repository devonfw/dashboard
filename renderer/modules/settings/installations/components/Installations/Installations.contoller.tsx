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

interface ConfirmDialogState {
  open: boolean;
  action: 'uninstall' | 'update' | null;
  dialogTitle: string;
  dialogContent: string;
}

interface InstallationsState {
  query?: string;
  installations: DevonIdeScript[];
  tableState?: TableState;
  loading: boolean;
  selectedPath?: string;
  confirmDialogState?: ConfirmDialogState;
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
    selectedPath: '',
    confirmDialogState: {
      open: false,
      action: null,
      dialogTitle: '',
      dialogContent: '',
    },
  };
  allInstallations: DevonIdeScript[] = [];

  constructor(props: unknown) {
    super(props);
  }

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

  confirmAction = (
    action: 'uninstall' | 'update',
    selectedPath: string
  ): void => {
    const confirmDialogTitle =
      action === 'uninstall' ? 'Uninstalling IDE' : 'Updating IDE';
    const confirmDialogContent =
      action === 'uninstall'
        ? 'Devonfw Dashboard will no longer keep track of this IDE. Are you sure?'
        : 'Devonfw Dashboard will update settings and software for this IDE. Proceed?';
    const confirmDialogState: ConfirmDialogState = {
      open: true,
      action: action,
      dialogTitle: confirmDialogTitle,
      dialogContent: confirmDialogContent,
    };
    this.setState({ confirmDialogState, selectedPath });
  };

  handleCloseDialog = (confirm: boolean): void => {
    const confirmDialogState: ConfirmDialogState = {
      ...this.state.confirmDialogState,
      open: false,
    };
    this.setState({ confirmDialogState });
    if (confirm) {
      this.state.confirmDialogState.action === 'uninstall'
        ? this.uninstallIde(this.state.selectedPath)
        : this.updateIde(this.state.selectedPath);
    } else this.setState({ selectedPath: '' });
  };

  uninstallIde = (path: string): void => {
    global.ipcRenderer
      .invoke('uninstall:ide', path)
      .then((success: boolean) => {
        if (success) {
          this.setState({
            installations: [],
            loading: true,
            selectedPath: '',
          });
          this.allInstallations = [];
          global.ipcRenderer.send('fetch:devonIdeScripts');
          global.ipcRenderer.send('find:devonfwInstances');
        }
      });
  };

  updateIde = (path: string): void => {
    console.log('Updating', path);
  };

  handleViewIde = (idePath: string): void => {
    global.ipcRenderer.send('open:directory', idePath);
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
          actionHandler={this.confirmAction}
          viewIdeHandler={this.handleViewIde}
          handlePageChange={this.handlePageChange}
          handleRowsPerPageChange={this.handleRowsPerPageChange}
        ></InstallationsView>
        <ConfirmDialog
          title={this.state.confirmDialogState.dialogTitle}
          content={this.state.confirmDialogState.dialogContent}
          openDialog={this.state.confirmDialogState.open}
          onClose={this.handleCloseDialog}
        ></ConfirmDialog>
      </>
    );
  }
}
