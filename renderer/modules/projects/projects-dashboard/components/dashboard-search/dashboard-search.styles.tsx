import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const useDashboardSearchStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      display: 'flex',
      position: 'relative',
      justifyContent: 'space-between',
      padding: '0 3em 3em 0',
      '& h3': {
        margin: 0,
      },
      '& .search': {
        minWidth: '40%',
        marginLeft: '2em',
      },
      '& .MuiFormControl-root': {
        minWidth: '40%',
      },
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
      },
    },
    filter: {
      display: 'flex',
      minWidth: '80%',
      justifyContent: 'flex-end',
      [theme.breakpoints.down('sm')]: {
        justifyContent: 'start',
      },
    },
    searchBox: {
      width: '100%',
    },
  })
);
