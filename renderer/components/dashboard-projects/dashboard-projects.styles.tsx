import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const useDashboardProjectsStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      '& .MuiPaper-elevation1': {
        boxShadow: 'none',
      },
      '& .MuiPaper-root': {
        backgroundColor: 'transparent',
        textDecoration: 'none',
      },
      '& .MuiButton-root:hover': {
        backgroundColor: 'transparent',
      },
      '& .MuiTypography-h6': {
        fontSize: '14px',
      },
    },
    newProject: {
      width: '211px',
      height: '159px',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '0 3em 3em 0',
      '& h3': {
        margin: 0,
      },
      '& .search': {
        width: '250px',
      },
      '& .MuiFormControl-root': {
        width: '100%',
      },
    },
    link: {
      textDecoration: 'none',
    },
    ProjectGrid: {
      position: 'relative',
      marginBottom: theme.spacing(4),
      '& .MuiCardContent-root': {
        position: 'absolute',
        top: '90px',
      },
    },
    alignCenter: {
      textAlign: 'center',
      marginTop: theme.spacing(2),
      marginLeft: theme.spacing(4),
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: theme.palette.primary.contrastText,
    },
    name: {
      color: theme.palette.primary.contrastText,
    },
    updateDate: {
      color: theme.palette.primary.light,
    },
  })
);
