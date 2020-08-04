import { makeStyles } from '@material-ui/core/styles';

export const useProjectExecutionUIStyles = makeStyles({
  root: {
    '& .MuiExpansionPanelDetails-root': {
      backgroundColor: '#F6F6F6',
      borderTop: '1px solid #707070',
      padding: '2em',
    },
    '& .MuiSvgIcon-root': {
      fontSize: '2rem !important',
    },
    '& .action': {
      marginTop: '2em',
      display: 'flex',
      '& button': {
        marginRight: '1em',
        width: '75px',
      },
      '& .MuiButton-containedSizeSmall': {
        padding: '7px 10px',
      },
    },
    '& .installation': {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      fontSize: '1.2em',
      fontWeight: 'bold',
      color: '#495057',
    },
    '& .execution': {
      display: 'flex',
      width: '100%',
      justifyContent: 'space-between',
      fontSize: '1.2em',
      paddingTop: '0.2em',
      fontWeight: 'bold',
      color: '#495057',
      '& > div': {
        display: 'flex',
        alignItems: 'center',
      },
    },
    '& .success': {
      color: '#81CF08',
      '& .MuiSvgIcon-root': {
        fontSize: '2.5rem',
      },
    },
    '& .error': {
      color: '#E01600',
      '& .MuiSvgIcon-root': {
        fontSize: '2.5rem',
      },
      '& .MuiButtonBase-root': {
        marginLeft: '1em',
      },
    },
    '& .process-details': {
      backgroundColor: '#212529',
      height: '300px',
      overflowY: 'auto',
      color: '#FFFFFF',
      overflowWrap: 'break-word',
      whiteSpace: 'pre-wrap',
    },
    '& .project-process-info': {
      textAlign: 'center',
      width: '100%',
      fontSize: '1.2em',
      '& .success': {
        fontWeight: 'bold',
        color: '#495057',
      },
      '& .error': {
        fontWeight: 'bold',
        color: 'red',
      },
    },
    '& .progress': {
      marginTop: '1em',
      '& .MuiCircularProgress-colorPrimary': {
        color: '#FFFFFF',
      }
    }
  },
});
