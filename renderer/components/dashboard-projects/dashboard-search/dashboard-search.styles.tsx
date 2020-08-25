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
        width: '30em',
        marginLeft: '2em',
      },
      '& .MuiFormControl-root': {
        width: '100%',
      },
    },
    filter: {
      display: 'flex',
    },
    searchBox: {
      width: '100%',
    },
  })
);
