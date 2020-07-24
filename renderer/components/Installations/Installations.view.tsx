import React, { ChangeEvent } from 'react';
import { TextField, Card, Button, Typography } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import GetApp from '@material-ui/icons/GetApp';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { DevonIdeScripts } from './Installations.contoller';

interface InstallationsViewProps {
  query: string;
  handleQuery: (event: ChangeEvent<{ value: unknown }>) => void;
  installations: DevonIdeScripts[];
}

export default function InstallationsView(
  props: InstallationsViewProps
): JSX.Element {
  const useSearcherStyles = makeStyles((theme: Theme) =>
    createStyles({
      header: {
        padding: theme.spacing(2),
      },
      button: {
        backgroundColor: '#0075B3',
        color: '#FFFFFF',
      },
      form: {
        float: 'right',
      },
    })
  );
  const classes = useSearcherStyles();

  return (
    <Card>
      <div className={classes.header}>
        <form className={classes.form} noValidate autoComplete="off">
          <TextField
            id="outlined-basic"
            label="Search versions"
            variant="outlined"
            value={props.query}
            onChange={props.handleQuery}
          />
        </form>
        <Typography variant="body2" color="textSecondary" component="p">
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
            {props.installations.map(
              (installation: DevonIdeScripts, index: number) => (
                <TableRow key={index}>
                  <TableCell>{installation.version}</TableCell>
                  <TableCell>
                    {new Date(installation.updated).toString()}
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      className={classes.button}
                      variant="contained"
                      color="primary"
                    >
                      Update
                    </Button>
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      className={classes.button}
                      variant="contained"
                      color="primary"
                      startIcon={<GetApp />}
                      href={
                        'https://search.maven.org/classic/remotecontent?filepath=com/devonfw/tools/ide/devonfw-ide-scripts/' +
                        installation.version +
                        '/devonfw-ide-scripts-' +
                        installation.version +
                        '.tar.gz'
                      }
                    >
                      Download
                    </Button>
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
}
