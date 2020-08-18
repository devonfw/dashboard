import { makeStyles, createStyles } from '@material-ui/core/styles';
export const menuStyles = makeStyles(() =>
  createStyles({
    menuRoot: {
      width: '500px',
    },
    list: {
      width: '100%',
    },
    sublist: {
      padding: '0px',
    },
    menuItemRoot: {
      width: '100%',
      padding: '0px',
      '& .MuiMenuItem-root': {
        paddingBottom: '0px',
      },
      '& .MuiButtonBase-root': {
        paddingLeft: '2em',
      },
    },
    listItem: {
      width: '100%',
      paddingBottom: '0px',
    },
    item: {
      padding: '1em',
    },
  })
);
