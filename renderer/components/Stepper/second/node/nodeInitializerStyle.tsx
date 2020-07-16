import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const nodeInitializerStyle = (theme: Theme) => ({
    root: {
        paddingLeft: '8px',
        '& > *': {
            marginLeft: theme.spacing(2),
        },
        display: 'flex',
        'flex-direction': 'column',
        '& .MuiFormControl-root': {
            width: '40em'
        },
        '& .formControl': {
            marginTop: '1em'
        },
        '& .formControl:first-child': {
            marginTop: '0'
        }
    },
    action: {
        marginTop: '1em',
        display: 'flex',
        '& button': {
            marginRight: '1em',
            width: '75px'
        },
        '& .MuiButton-containedSizeSmall': {
            padding: '7px 10px'
        }
    },
    error: {
        color: 'red'
    }
});

export default nodeInitializerStyle;