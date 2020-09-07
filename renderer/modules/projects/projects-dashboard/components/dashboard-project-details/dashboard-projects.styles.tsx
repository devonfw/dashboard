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
      },
      '& .MuiButton-root:hover': {
        backgroundColor: 'transparent',
      },
    },
    cardsContainer: {
      display: 'grid',
      width: '100%',
      gridColumnGap: 24,
      gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))',
    },
    link: {
      textDecoration: 'none',
    },
    cardContent: {
      paddingTop: theme.spacing(0.5),
      paddingRight: theme.spacing(2),
      paddingBottom: theme.spacing(0.5),
      paddingLeft: theme.spacing(2),
    },
    cardMedia: {
      width: '190px',
      height: '156px',
      backgroundSize: 'contain',
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: theme.palette.primary.contrastText,
    },
  })
);
