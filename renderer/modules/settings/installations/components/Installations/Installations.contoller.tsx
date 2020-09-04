import { Component, ChangeEvent } from 'react';
import InstallationsView from './Installations.view';
import { IpcRendererEvent } from 'electron';
import ConfirmDialog from '../../../../shared/components/confirm-dialog/confirm-dialog';

export interface DevonIdeScripts {
  version: string;
  path?: string;
  updated: Date;
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
    this.getInstallations();
  }

  componentWillUnmount(): void {
    global.ipcRenderer.removeAllListeners('get:installedVersions');
  }

  getInstallations = (): void => {
    global.ipcRenderer.invoke('get:installedVersions').then((result) => {
      const installations = [...result];
      this.setState({ installations });
      this.allInstallations.push(...installations);
    });
  };

  handleQuery = (event: ChangeEvent<{ value: unknown }>): void => {
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

  confirmUninstall = (idePath: string): void => {
    this.setState({ openConfirmDialog: true, uninstallIdePath: idePath });
  };

  handleCloseDialog = (confirm: boolean): void => {
    this.setState({ openConfirmDialog: false });
    if (confirm) this.uninstallIde(this.state.uninstallIdePath);
    else this.setState({ uninstallIdePath: '' });
  };

  uninstallIde = (idePath: string): void => {
    global.ipcRenderer
      .invoke('uninstall:ide', idePath)
      .then((success: boolean) => {
        if (success) {
          this.getInstallations();
          global.ipcRenderer.send('find:devonfwInstances');
        }
      });
    this.setState({ uninstallIdePath: '' });
  };

  handleViewIde = (idePath: string): void => {
    global.ipcRenderer.invoke('view:ide', idePath);
  };

  render(): JSX.Element {
    return (
      <>
        <InstallationsView
          query={this.state.query}
          installations={this.state.installations}
          page={this.state.tableState.page}
          rowsPerPage={this.state.tableState.rowsPerPage}
          uninstallHandler={this.confirmUninstall}
          viewIdeHandler={this.handleViewIde}
          queryHandler={this.handleQuery}
          pageChangehandler={this.handlePageChange}
          rowsPerPageChangeHandler={this.handleRowsPerPageChange}
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
