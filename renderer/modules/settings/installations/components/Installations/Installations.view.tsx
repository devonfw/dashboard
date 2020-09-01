import React, { ChangeEvent } from 'react';
import { DevonIdeScripts } from './Installations.contoller';
import { TextField, Card, Typography } from '@material-ui/core';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import GetApp from '@material-ui/icons/GetApp';

import AcceptButton from '../../../../shared/components/accept-button/accept-button';
import useInstallationsStyles from './installations.styles';

interface InstallationsViewProps {
  query: string;
  queryHandler: (event: ChangeEvent<{ value: unknown }>) => void;
  downloadHandler: (index: number) => void;
  installations: DevonIdeScripts[];
  page: number;
  rowsPerPage: number;
  handlePageChange: (event: unknown, newPage: number) => void;
  handleRowsPerPageChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function InstallationsView(
  props: InstallationsViewProps
): JSX.Element {
  const classes = useInstallationsStyles();

  return (
    <Card>
      <div className={classes.header}>
        <form className={classes.form} noValidate autoComplete="off">
          <TextField
            id="outlined-basic"
            label="Search versions"
            variant="outlined"
            value={props.query}
            onChange={props.queryHandler}
            className={classes.textField}
          />
        </form>
        <Typography variant="body2" component="p">
          INSTALLED TOOLS
        </Typography>
        <Typography gutterBottom variant="h5" component="h2">
          Devon IDE Versions
        </Typography>
      </div>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Version</TableCell>
              <TableCell>Release Date</TableCell>
              <TableCell align="center">Update</TableCell>
              <TableCell align="center">Download</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(props.rowsPerPage > 0
              ? props.installations.slice(
                  props.page * props.rowsPerPage,
                  props.page * props.rowsPerPage + props.rowsPerPage
                )
              : props.installations
            ).map((installation: DevonIdeScripts, index: number) => (
              <TableRow key={index}>
                <TableCell>{installation.version}</TableCell>
                <TableCell>{installation.updated}</TableCell>
                <TableCell align="center">
                  <AcceptButton>Update</AcceptButton>
                </TableCell>
                <TableCell align="center">
                  {!installation.downloading && (
                    <AcceptButton
                      disabled={installation.installed}
                      startIcon={<GetApp />}
                      onClick={() => props.downloadHandler(installation.id)}
                      href={
                        'https://search.maven.org/classic/remotecontent?filepath=com/devonfw/tools/ide/devonfw-ide-scripts/' +
                        installation.version +
                        '/devonfw-ide-scripts-' +
                        installation.version +
                        '.tar.gz'
                      }
                    >
                      Download
                    </AcceptButton>
                  )}
                  {installation.downloading && <CircularProgress size={24} />}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                count={props.installations.length}
                rowsPerPage={props.rowsPerPage}
                page={props.page}
                onChangePage={props.handlePageChange}
                onChangeRowsPerPage={props.handleRowsPerPageChange}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Card>
  );
}
